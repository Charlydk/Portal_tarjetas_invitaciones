// Prueba de los filtros del panel de tarjetas.
// No hay suite en el repo: se corre con `node scripts/probar-admin.mjs`.
import assert from 'node:assert/strict';
import { FILTRO_INICIAL, FILTROS, contarPorEstado, filtrarTarjetas } from '../src/lib/adminFiltros.js';

const t = (id, status) => ({ id, status });
const lista = [
  t(1, 'revision'), t(2, 'revision'), t(3, 'borrador'),
  t(4, 'publicada'), t(5, 'publicada'), t(6, 'publicada'),
  t(7, 'archivada'), t(8, 'estado-raro'),
];

// ── Por defecto, sólo lo que espera revisión ─────────────────────────────────
assert.equal(FILTRO_INICIAL, 'revision');
assert.deepEqual(filtrarTarjetas(lista, FILTRO_INICIAL).map((x) => x.id), [1, 2]);

// ── Un filtro por estado, y uno para ver todo ────────────────────────────────
assert.deepEqual(filtrarTarjetas(lista, 'borrador').map((x) => x.id), [3]);
assert.deepEqual(filtrarTarjetas(lista, 'publicada').map((x) => x.id), [4, 5, 6]);
assert.deepEqual(filtrarTarjetas(lista, 'archivada').map((x) => x.id), [7]);
assert.equal(filtrarTarjetas(lista, 'todas').length, 8);

// Un estado que el panel no conoce no se pierde: aparece en "todas".
assert.deepEqual(filtrarTarjetas(lista, 'todas').map((x) => x.id).includes(8), true);
// Un filtro desconocido no esconde todo en silencio: se comporta como "todas".
assert.equal(filtrarTarjetas(lista, 'cualquiera').length, 8);

// ── Los contadores, para que nada quede oculto sin que se note ───────────────
assert.deepEqual(contarPorEstado(lista), {
  revision: 2, borrador: 1, publicada: 3, archivada: 1, todas: 8,
});
assert.deepEqual(contarPorEstado([]), { revision: 0, borrador: 0, publicada: 0, archivada: 0, todas: 0 });

// ── El orden de las pestañas: primero lo que hay que atender ─────────────────
assert.deepEqual(FILTROS.map((f) => f.id), ['revision', 'borrador', 'publicada', 'archivada', 'todas']);
assert.ok(FILTROS.every((f) => f.texto));

console.log('adminFiltros: todo en orden');
