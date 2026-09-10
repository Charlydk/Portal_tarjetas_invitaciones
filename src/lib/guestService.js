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

export async function respondAsGuest({ guestToken, attending, companions = 0, notes = '' }) {
  const { error } = await supabase.rpc('guest_respond', {
    p_guest_token: guestToken,
    p_attending: attending,
    p_companions: companions,
    p_notes: notes,
  });
  if (error) throw error;
}

/**
 * De un texto pegado a una lista de invitados.
 *
 * El cliente no va a cargar cien nombres de a uno en un formulario: los tiene
 * en un papel, en una nota del teléfono o en un Excel. Pega y listo.
 *
 * Un nombre por línea. El número después de una coma es el cupo — cuántos
 * puede traer — y si no está, es cero.
 *
 *   Juan Pérez, 1
 *   Familia Díaz, 3
 *   Marta
 */
export function parsearLista(texto) {
  return texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) => {
      const coma = linea.lastIndexOf(',');
      // Sólo cuenta como cupo si lo que sigue a la coma es un número. Así
      // "Pérez, Juan" no se interpreta como un cupo de cero.
      if (coma > 0) {
        const posible = linea.slice(coma + 1).trim();
        if (/^\d+$/.test(posible)) {
          return { name: linea.slice(0, coma).trim(), max_companions: Number(posible) };
        }
      }
      return { name: linea, max_companions: 0 };
    });
}

/** El número que va al salón, y el que dice a quién hay que perseguir. */
export function resumirInvitados(invitados) {
  const confirmados = invitados.filter((g) => g.status === 'confirmado');
  return {
    invitados: invitados.length,
    confirmados: confirmados.length,
    rechazados: invitados.filter((g) => g.status === 'rechazado').length,
    pendientes: invitados.filter((g) => g.status === 'pendiente').length,
    // Cada confirmado es él más los que trae.
    personas: confirmados.reduce((suma, g) => suma + 1 + (g.companions || 0), 0),
  };
}
