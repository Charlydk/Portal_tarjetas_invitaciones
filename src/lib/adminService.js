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
