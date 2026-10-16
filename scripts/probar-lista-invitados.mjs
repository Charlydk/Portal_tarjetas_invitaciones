// Prueba de la lógica de la lista de invitados. No hay suite en el repo: esto se
// corre con `node scripts/probar-lista-invitados.mjs` y sale con error si algo falla.
import assert from 'node:assert/strict';
import {
  parsearLista, normalizarTelefono, resumirInvitados, resumirRestricciones,
  filtrarInvitados, invitadosACsv, validarInvitado, armarInvitado,
} from '../src/lib/listaInvitados.js';

// ── Lo de siempre sigue igual ────────────────────────────────────────────────
assert.deepEqual(parsearLista('Juan Pérez, 1'), [{ name: 'Juan Pérez', max_companions: 1 }]);
assert.deepEqual(parsearLista('Marta'), [{ name: 'Marta', max_companions: 0 }]);
// "Pérez, Juan" es un nombre, no una empresa ni un cupo.
assert.deepEqual(parsearLista('Pérez, Juan'), [{ name: 'Pérez, Juan', max_companions: 0 }]);
assert.deepEqual(
  parsearLista('Familia Díaz, 3\n\n  Marta  '),
  [{ name: 'Familia Díaz', max_companions: 3 }, { name: 'Marta', max_companions: 0 }],
);

// ── Con contacto, por coma: cada dato se reconoce por su forma ───────────────
assert.deepEqual(
  parsearLista('Ana Ruiz, ana@acme.com, 11 5555-1234, Acme SA, 2'),
  [{ name: 'Ana Ruiz', max_companions: 2, email: 'ana@acme.com', phone: '11 5555-1234', company: 'Acme SA' }],
);
// El orden no importa.
assert.deepEqual(
  parsearLista('Ana Ruiz, Acme SA, 1155551234, ana@acme.com'),
  [{ name: 'Ana Ruiz', max_companions: 0, email: 'ana@acme.com', phone: '1155551234', company: 'Acme SA' }],
);

// ── Pegado desde Excel: tabs, con encabezado ─────────────────────────────────
assert.deepEqual(
  parsearLista('Nombre\tEmpresa\tEmail\tTeléfono\nLuis Gómez\tGlobex\tluis@globex.com\t+598 99 123 456'),
  [{ name: 'Luis Gómez', max_companions: 0, email: 'luis@globex.com', phone: '+598 99 123 456', company: 'Globex' }],
);
// Una fila de Excel con celdas vacías no inventa datos.
assert.deepEqual(parsearLista('Eva Paz\t\t\t'), [{ name: 'Eva Paz', max_companions: 0 }]);

// Un mail mal escrito se descarta en vez de hacer fallar la carga entera.
assert.deepEqual(parsearLista('Ana, ana@, Acme'), [{ name: 'Ana', max_companions: 0, company: 'Acme' }]);

// ── Teléfonos ────────────────────────────────────────────────────────────────
assert.equal(normalizarTelefono('11 5555-1234'), '5491155551234');
assert.equal(normalizarTelefono('011 5555-1234'), '5491155551234');
assert.equal(normalizarTelefono('+54 9 11 5555-1234'), '5491155551234');
assert.equal(normalizarTelefono('5491155551234'), '5491155551234');
assert.equal(normalizarTelefono('541155551234'), '5491155551234');
assert.equal(normalizarTelefono('+598 99 123 456'), '59899123456');
assert.equal(normalizarTelefono(''), '');

// ── Resumen, restricciones, filtros ──────────────────────────────────────────
const lista = [
  { id: 1, name: 'A', status: 'confirmado', companions: 1, dietary: ['celiaco', 'vegano'], dietary_notes: null },
  { id: 2, name: 'B', status: 'confirmado', companions: 0, dietary: ['celiaco'], dietary_notes: 'sin maní' },
  { id: 3, name: 'C', status: 'rechazado', companions: 0, dietary: ['vegetariano'], dietary_notes: null },
  { id: 4, name: 'D', status: 'pendiente', companions: 0, dietary: [], dietary_notes: null },
];
assert.deepEqual(resumirInvitados(lista), { invitados: 4, confirmados: 2, rechazados: 1, pendientes: 1, personas: 3 });
// Sólo cuentan los confirmados: quien no viene no come.
assert.deepEqual(
  resumirRestricciones(lista).map((r) => [r.id, r.cantidad]),
  [['celiaco', 2], ['vegano', 1]],
);
assert.deepEqual(filtrarInvitados(lista, { estado: 'pendiente' }).map((g) => g.id), [4]);
assert.deepEqual(filtrarInvitados(lista, { conRestricciones: true }).map((g) => g.id), [1, 2, 3]);
assert.equal(filtrarInvitados(lista).length, 4);

// ── CSV ──────────────────────────────────────────────────────────────────────
const csv = invitadosACsv(
  [{ name: '=HYPERLINK("x")', company: 'Acme; "SA"', status: 'confirmado', companions: 1,
     dietary: ['celiaco'], dietary_notes: 'sin maní', slug: 'evento', token: 'abc' }],
  'https://fxestudio.com.ar',
);
assert.ok(csv.startsWith('﻿"Nombre";"Empresa"'));
// La fórmula queda como texto, y las comillas y el punto y coma no rompen la fila.
assert.ok(csv.includes(`"'=HYPERLINK(""x"")"`));
assert.ok(csv.includes('"Acme; ""SA"""'));
assert.ok(csv.includes('"Celíaco"'));
assert.ok(csv.includes('"https://fxestudio.com.ar/i/evento?i=abc"'));

// ── Formulario de a uno ──────────────────────────────────────────────────────
// Sólo el nombre es obligatorio: el resto se completa si se tiene.
assert.deepEqual(validarInvitado({ name: 'Ana Ruiz' }), {});
assert.deepEqual(validarInvitado({ name: '   ' }), { name: 'Escribí el nombre.' });
assert.deepEqual(validarInvitado({ name: 'x'.repeat(121) }), { name: 'El nombre es demasiado largo.' });
assert.deepEqual(validarInvitado({ name: 'Ana', email: 'ana@acme.com', phone: '11 5555-1234', max_companions: '2' }), {});
// Un mail o un teléfono mal escritos se avisan en el formulario; en la lista pegada se descartan.
assert.deepEqual(validarInvitado({ name: 'Ana', email: 'ana@' }), { email: 'Revisá el mail: parece incompleto.' });
assert.deepEqual(validarInvitado({ name: 'Ana', phone: '12' }), { phone: 'Revisá el teléfono: parece incompleto.' });
assert.deepEqual(validarInvitado({ name: 'Ana', max_companions: '21' }), { max_companions: 'El máximo es 20.' });
assert.deepEqual(validarInvitado({ name: 'Ana', max_companions: '-1' }), { max_companions: 'El máximo es 20.' });
// Varios errores a la vez, para no corregirlos de a uno.
assert.deepEqual(
  Object.keys(validarInvitado({ name: '', email: 'x', phone: '1' })).sort(),
  ['email', 'name', 'phone'],
);

// Lo que se manda a la base: sin espacios, sin campos vacíos, con el cupo como número.
assert.deepEqual(armarInvitado({ name: ' Ana Ruiz ' }), { name: 'Ana Ruiz', max_companions: 0 });
assert.deepEqual(
  armarInvitado({ name: 'Ana', company: ' Acme ', email: ' ana@acme.com ', phone: ' 11 5555-1234 ', max_companions: '2' }),
  { name: 'Ana', max_companions: 2, company: 'Acme', email: 'ana@acme.com', phone: '11 5555-1234' },
);
assert.deepEqual(armarInvitado({ name: 'Ana', email: '', phone: '', company: '', max_companions: '' }), { name: 'Ana', max_companions: 0 });

console.log('listaInvitados: todo en orden');
