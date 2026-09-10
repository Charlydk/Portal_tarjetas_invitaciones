/**
 * El cronograma, de texto pegado a datos y de vuelta.
 *
 * Vive aparte del componente porque un archivo que exporta funciones junto a
 * componentes rompe el recambio en caliente de Vite — la misma razón por la que
 * gateTheme.js está separado de WelcomeGate.
 */

/** De "21:00 Ceremonia" a { time, label }. Acepta 21:00, 21.00 y "21:00 - Cena". */
export function parsearCronograma(texto) {
  return texto
    .split('\n')
    .map((linea) => linea.trim())
    .filter(Boolean)
    .map((linea) => {
      const m = linea.match(/^(\d{1,2}[:.]\d{2})\s*[-–—·|]?\s*(.*)$/);
      if (!m) return { time: '', label: linea };
      return { time: m[1].replace('.', ':'), label: m[2].trim() };
    })
    .filter((i) => i.time || i.label);
}

/** Y de vuelta, para poder editarlo como el cliente lo escribió. */
export function cronogramaATexto(schedule = []) {
  return schedule.map((i) => `${i.time || ''} ${i.label || ''}`.trim()).join('\n');
}
