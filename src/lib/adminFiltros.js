/**
 * Los filtros de la lista de tarjetas del panel.
 *
 * Una tarjeta pasa por varios estados y la lista creció hasta mezclarlos todos:
 * las que esperan revisión, las ya entregadas y las que se dieron de baja,
 * una abajo de la otra. Se separan por estado y, por defecto, se muestra sólo lo
 * que hay que atender: lo que está en revisión.
 *
 * Lo ocultado no desaparece: cada pestaña lleva su contador, así que nadie
 * se queda sin ver una tarjeta sin darse cuenta.
 */

// Primero lo que hay que atender, último el "todo".
export const FILTROS = [
  { id: 'revision', texto: 'En revisión' },
  { id: 'borrador', texto: 'Borrador' },
  { id: 'publicada', texto: 'Publicada' },
  { id: 'archivada', texto: 'Archivada' },
  { id: 'todas', texto: 'Todas' },
];

export const FILTRO_INICIAL = 'revision';

const ESTADOS = ['revision', 'borrador', 'publicada', 'archivada'];

/**
 * Cuántas tarjetas hay en cada estado. "todas" cuenta también las de un estado
 * que el panel no conoce: no se pierden, sólo no tienen pestaña propia.
 */
export function contarPorEstado(tarjetas) {
  const cuentas = { revision: 0, borrador: 0, publicada: 0, archivada: 0, todas: tarjetas.length };
  for (const t of tarjetas) {
    if (ESTADOS.includes(t.status)) cuentas[t.status] += 1;
  }
  return cuentas;
}

/**
 * Un filtro desconocido se comporta como "todas": un valor equivocado no tiene
 * que esconder todo en silencio.
 */
export function filtrarTarjetas(tarjetas, filtro) {
  if (!ESTADOS.includes(filtro)) return tarjetas;
  return tarjetas.filter((t) => t.status === filtro);
}
