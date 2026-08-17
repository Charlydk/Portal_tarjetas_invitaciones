import { supabase } from './supabase';

/**
 * Lectura de tarjetas entregadas.
 *
 * Una tarjeta es una fila, no un repositorio: /i/:slug la busca acá en vez de
 * existir como un deploy aparte. Ver supabase/migrations/001_invitations.sql.
 */

const PUBLIC_FIELDS = 'slug, model_id, variant_id, data, expires_at';

/**
 * Tarjeta publicada por su slug — lo que abre un invitado.
 *
 * Devuelve `null` cuando no existe, no está publicada o venció. Las tres son el
 * mismo caso para quien la abre, y la política de la base ya filtra las tres,
 * así que acá no hay decisión que tomar.
 */
export async function fetchInvitationBySlug(slug) {
  const { data, error } = await supabase
    .from('invitations')
    .select(PUBLIC_FIELDS)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * Borrador por token — lo que abre el cliente para previsualizar su tarjeta
 * antes de que se publique.
 *
 * Pasa por una función de la base (`security definer`) porque el token es la
 * credencial: si esto fuera una consulta común, la política tendría que comparar
 * contra un valor enviado por el navegador y se podría enumerar la tabla.
 */
export async function fetchInvitationByToken(token) {
  const { data, error } = await supabase
    .rpc('get_invitation_by_token', { p_token: token });

  if (error) throw error;
  return data?.[0] ?? null;
}
