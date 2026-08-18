import { supabase } from './supabase';

/**
 * El panel interno: entrar, y ver las tarjetas.
 *
 * Nada de lo que hay acá decide quién puede qué. Eso lo decide la base — ver
 * supabase/migrations/004_admin.sql. Si alguien entra con una cuenta que no
 * está en la lista, estas consultas devuelven vacío y los cambios rebotan. La
 * pantalla sólo tiene que contarlo de forma entendible.
 */

export function onSession(callback) {
  supabase.auth.getSession().then(({ data }) => callback(data.session));
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => data.subscription.unsubscribe();
}

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}

/**
 * Una cuenta válida no es lo mismo que una cuenta del equipo: cualquiera puede
 * registrarse. Preguntar esto por separado es lo que permite distinguir "no
 * tenés permiso" de "todavía no hay tarjetas", que en pantalla se ven igual.
 */
export async function isAdmin() {
  const { data, error } = await supabase.rpc('is_admin');
  if (error) return false;
  return Boolean(data);
}

export async function listInvitations() {
  const { data, error } = await supabase
    .from('invitations')
    .select('id, slug, client_name, client_whatsapp, status, variant_id, edit_token, published_at, expires_at, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchInvitation(id) {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

const BUCKET = 'tarjetas';

/**
 * Las fotos entran al formulario como texto: el selector las achica en el
 * navegador y las deja pegadas adentro del propio formulario, que es lo
 * correcto para un borrador que todavía no existe.
 *
 * Pero adentro de la tarjeta entregada ese texto sería veneno: viaja en la
 * misma consulta que trae los datos, antes de que se dibuje nada, cada vez que
 * un invitado abre el link. Así que al guardar se convierten en archivos.
 *
 * Las que ya son URL pasan de largo: guardar dos veces no vuelve a subir nada.
 */
async function subirFotos(slug, photos = []) {
  const urls = [];

  for (const [i, foto] of photos.entries()) {
    if (!foto) continue;
    if (!foto.startsWith('data:')) {
      urls.push(foto);
      continue;
    }

    const blob = await (await fetch(foto)).blob();
    // El nombre lleva la marca de tiempo para que reemplazar una foto no quede
    // tapado por la copia vieja que el navegador del invitado ya tenía.
    const path = `${slug}/${Date.now()}-${i}.jpg`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, blob, { contentType: blob.type || 'image/jpeg', upsert: true });

    // Se dice QUÉ foto y POR QUÉ. Un "no pudimos guardar" a secas obliga a
    // adivinar entre la subida y la fila, que fallan por motivos distintos y
    // se arreglan de maneras distintas.
    if (error) {
      console.error('Falló la subida de una foto', { path, tipo: blob.type, peso: blob.size, error });
      throw new Error(`No pudimos subir la foto ${i + 1} (${Math.round(blob.size / 1024)} KB, ${blob.type || 'sin tipo'}): ${error.message}`);
    }

    urls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return urls;
}

/**
 * Borra del bucket las fotos que la tarjeta ya no usa.
 *
 * Quitar una foto la sacaba de la tarjeta pero la dejaba en el bucket para
 * siempre. Una sola no molesta; una por corrección por cliente se acumula en
 * silencio y se paga.
 *
 * Tres reglas, y las tres importan porque esto borra archivos:
 *
 *   1. Corre DESPUÉS de guardar la fila, nunca antes. Si borrara primero y el
 *      guardado fallara, la tarjeta seguiría apuntando a fotos que ya no
 *      existen — el peor resultado posible.
 *   2. Sólo mira la carpeta de esta tarjeta. Nunca recorre el bucket entero.
 *   3. Si no puede leer la carpeta, no borra nada. Ante la duda no se adivina:
 *      una foto de más ocupa unos kilobytes, una de menos es la tarjeta de un
 *      cliente rota.
 *
 * Fallar acá no rompe el guardado: la tarjeta ya quedó bien y esto es limpieza.
 */
async function borrarFotosQueYaNoSeUsan(slug, urlsVigentes) {
  const { data: archivos, error } = await supabase.storage.from(BUCKET).list(slug, { limit: 100 });
  if (error || !archivos?.length) return;

  const enUso = new Set(urlsVigentes.map((url) => url.split('/').pop()));
  const sobran = archivos
    .filter((archivo) => !enUso.has(archivo.name))
    .map((archivo) => `${slug}/${archivo.name}`);

  if (!sobran.length) return;

  const { error: errorAlBorrar } = await supabase.storage.from(BUCKET).remove(sobran);
  if (errorAlBorrar) console.warn('Quedaron fotos sin usar en el bucket', sobran, errorAlBorrar);
}

/**
 * Guarda una tarjeta, nueva o corregida.
 *
 * `id` ausente significa nueva. Es la única diferencia: los datos que se envían
 * son los mismos, así que corregir una tarjeta cargada mal no es un camino
 * aparte que pueda quedar desactualizado.
 */
export async function saveInvitation({ id, slug, clientName, clientWhatsapp, status, expiresAt, publishedAt, formData }) {
  const galleryPhotos = await subirFotos(slug, formData.galleryPhotos);
  const data = { ...formData, galleryPhotos };

  const fila = {
    slug,
    model_id: formData.modelId,
    variant_id: formData.variantId,
    client_name: clientName || null,
    client_whatsapp: clientWhatsapp || null,
    status,
    expires_at: expiresAt || null,
    data,
  };

  // Se sella una sola vez: es la fecha en que la tarjeta salió, no la última
  // vez que alguien guardó una corrección.
  if (status === 'publicada' && !publishedAt) fila.published_at = new Date().toISOString();

  const consulta = id
    ? supabase.from('invitations').update(fila).eq('id', id)
    : supabase.from('invitations').insert(fila);

  const { error } = await consulta;
  if (error) {
    console.error('Falló el guardado de la tarjeta', { fila: { ...fila, data: '…' }, error });
    throw error;
  }

  // Recién ahora, con la tarjeta ya guardada, se puede borrar lo que sobra.
  await borrarFotosQueYaNoSeUsan(slug, galleryPhotos);
}

/**
 * Publicar y dar de baja son el mismo movimiento en direcciones opuestas, así
 * que es una sola función: la que llama decide el destino.
 *
 * `published_at` se sella la primera vez y no se vuelve a tocar, porque es la
 * fecha en que la tarjeta salió, no la última vez que alguien apretó un botón.
 */
export async function setStatus(id, status, { alreadyPublished } = {}) {
  const patch = { status };
  if (status === 'publicada' && !alreadyPublished) {
    patch.published_at = new Date().toISOString();
  }

  const { error } = await supabase.from('invitations').update(patch).eq('id', id);
  if (error) throw error;
}
