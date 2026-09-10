import { supabase } from './supabase';

/**
 * Las confirmaciones de asistencia.
 *
 * Antes cada invitado mandaba un WhatsApp suelto y el cliente contaba a mano.
 * Acá quedan juntas, y el cliente las mira en un link — sin cuenta, igual que
 * su borrador. Ver supabase/migrations/005_rsvp.sql.
 */

/**
 * Lo que hace un invitado al confirmar.
 *
 * Pasa por una función de la base y no por un insert común porque el navegador
 * del invitado no conoce (ni debe conocer) el identificador interno de la
 * tarjeta: manda el slug, que es lo que tiene en la URL, y la base resuelve el
 * resto y verifica que la invitación esté publicada.
 */
export async function submitRsvp({ slug, name, attending, companions = 0, notes = '' }) {
  const { error } = await supabase.rpc('submit_rsvp', {
    p_slug: slug,
    p_name: name,
    p_attending: attending,
    p_companions: companions,
    p_notes: notes,
  });

  if (error) throw error;
}

/** La lista que ve el cliente. El token de su tarjeta es la credencial. */
export async function fetchRsvpsByToken(token) {
  const { data, error } = await supabase.rpc('get_rsvps_by_token', { p_token: token });
  if (error) throw error;
  return data || [];
}

/**
 * El número que el cliente le pasa al salón.
 *
 * `companions` es "cuántos vienen ADEMÁS de mí", así que cada confirmación
 * suma uno más sus acompañantes. Contar sólo las filas daría de menos, y ese
 * error se descubre el día del evento.
 */
export function resumirRsvps(respuestas) {
  const vienen = respuestas.filter((r) => r.attending);
  return {
    total: respuestas.length,
    vienen: vienen.length,
    noVienen: respuestas.length - vienen.length,
    personas: vienen.reduce((suma, r) => suma + 1 + (r.companions || 0), 0),
    conNotas: respuestas.filter((r) => r.notes).length,
  };
}
