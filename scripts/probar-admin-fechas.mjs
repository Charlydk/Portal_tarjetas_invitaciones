// Prueba de cómo el panel cuenta los días del evento.
// No hay suite en el repo: se corre con `node scripts/probar-admin-fechas.mjs`.
import assert from 'node:assert/strict';
import { describirEvento } from '../src/lib/adminFechas.js';

// "Hoy" es siempre el mismo, para que la prueba no dependa del día en que se corre.
const hoy = new Date(2026, 9, 15, 23, 0); // 15 de octubre de 2026, 23:00

// ── Eventos que faltan ───────────────────────────────────────────────────────
assert.deepEqual(describirEvento('2027-03-18T19:00', hoy), {
  fecha: '18 mar 2027', relativo: 'faltan 154 días', pasado: false,
});
assert.deepEqual(describirEvento('2026-10-17T22:00', hoy), {
  fecha: '17 oct 2026', relativo: 'faltan 2 días', pasado: false,
});
assert.deepEqual(describirEvento('2026-10-16T21:00', hoy), {
  fecha: '16 oct 2026', relativo: 'es mañana', pasado: false,
});

// ── El día mismo cuenta como hoy, aunque la hora ya haya pasado ──────────────
// Una tarjeta no está vencida el día del evento.
assert.deepEqual(describirEvento('2026-10-15T08:00', hoy), {
  fecha: '15 oct 2026', relativo: 'es hoy', pasado: false,
});

// ── Eventos que ya fueron ────────────────────────────────────────────────────
assert.deepEqual(describirEvento('2026-10-14T21:00', hoy), {
  fecha: '14 oct 2026', relativo: 'fue ayer', pasado: true,
});
assert.deepEqual(describirEvento('2026-08-31T21:00', hoy), {
  fecha: '31 ago 2026', relativo: 'pasó hace 45 días', pasado: true,
});

// ── Sin fecha, o con una que no existe, no se inventa nada ───────────────────
for (const rara of [undefined, null, '', 'basura', '2026-13-45', '2027-02-29', '31/08/2026']) {
  assert.equal(describirEvento(rara, hoy), null, `debería ser null: ${rara}`);
}
// Un año bisiesto sí tiene 29 de febrero.
assert.equal(describirEvento('2028-02-29T20:00', hoy).fecha, '29 feb 2028');

// ── Sin la hora también sirve ────────────────────────────────────────────────
assert.equal(describirEvento('2026-10-20', hoy).relativo, 'faltan 5 días');

console.log('adminFechas: todo en orden');
