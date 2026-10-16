/**
 * La fecha del evento de una tarjeta, tal como la necesita quien mira el panel.
 *
 * Una tarjeta tiene fecha de vencimiento natural: el día del evento. Pasado eso
 * nadie la necesita, pero sigue en la lista mezclada con las que sí, y nada en
 * el panel decía cuáles eran. Mostrar cuántos días faltan o cuántos pasaron
 * deja ver de un vistazo qué tarjetas hay que archivar.
 */

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const DIA_MS = 24 * 60 * 60 * 1000;

/**
 * `eventDate` es lo que guarda el formulario: "AAAA-MM-DDTHH:MM", sin zona
 * horaria, en la hora del que lo cargó. Se compara por día de calendario y no por
 * horas: el día del evento la tarjeta todavía no está vencida, aunque la hora
 * ya haya pasado.
 *
 * Devuelve null si no hay fecha o no es una fecha real. Mostrar "pasó hace 20000
 * días" por un dato mal cargado es peor que no mostrar nada.
 */
export function describirEvento(eventDate, ahora = new Date()) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(eventDate || '');
  if (!m) return null;

  const [anio, mes, dia] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const evento = Date.UTC(anio, mes - 1, dia);

  // `Date.UTC` acomoda un 31 de febrero en marzo sin avisar: se descarta si el
  // día no es el mismo que se escribió.
  const control = new Date(evento);
  if (control.getUTCFullYear() !== anio || control.getUTCMonth() !== mes - 1 || control.getUTCDate() !== dia) {
    return null;
  }

  const hoy = Date.UTC(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  const dias = Math.round((evento - hoy) / DIA_MS);

  let relativo;
  if (dias > 1) relativo = `faltan ${dias} días`;
  else if (dias === 1) relativo = 'es mañana';
  else if (dias === 0) relativo = 'es hoy';
  else if (dias === -1) relativo = 'fue ayer';
  else relativo = `pasó hace ${-dias} días`;

  return { fecha: `${dia} ${MESES[mes - 1]} ${anio}`, relativo, pasado: dias < 0 };
}
