import { supabase } from './supabase';

/**
 * La lista de invitados (premium+).
 *
 * La confirmación base responde "quién contestó". Esta responde la que de
 * verdad importa dos semanas antes: "a quién le falta contestar".
 * Ver supabase/migrations/006_guest_list.sql.
 */

export async function listGuests(token) {
  const { data, error } = await supabase.rpc('guests_by_token', { p_token: token });
  if (error) throw error;
  return data || [];
}

export async function addGuests(token, guests) {
  const { data, error } = await supabase.rpc('add_guests', { p_token: token, p_guests: guests });
  if (error) throw error;
  return data;
}

export async function removeGuest(token, guestId) {
  const { error } = await supabase.rpc('remove_guest', { p_token: token, p_guest_id: guestId });
  if (error) throw error;
}

/** Lo que ve el invitado al abrir su propio enlace. */
export async function fetchGuest(guestToken) {
  const { data, error } = await supabase.rpc('guest_by_token', { p_guest_token: guestToken });
  if (error) throw error;
  return data?.[0] || null;
}

export async function respondAsGuest({
  guestToken, attending, companions = 0, notes = '', dietary = [], dietaryNotes = '',
}) {
  const { error } = await supabase.rpc('guest_respond', {
    p_guest_token: guestToken,
    p_attending: attending,
    p_companions: companions,
    p_notes: notes,
    p_dietary: dietary,
    p_dietary_notes: dietaryNotes,
  });
  if (error) throw error;
}

export async function markGuestsSent(token, guestIds, via) {
  const { data, error } = await supabase.rpc('mark_guests_sent', {
    p_token: token,
    p_guest_ids: guestIds,
    p_via: via,
  });
  if (error) throw error;
  return data;
}

// La lectura de lo que se pega, el resumen y la exportación viven en
// listaInvitados.js: no necesitan red y así se pueden probar sin Supabase.
export { parsearLista, resumirInvitados } from './listaInvitados';
