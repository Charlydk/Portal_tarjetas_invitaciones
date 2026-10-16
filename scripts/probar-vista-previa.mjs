// Prueba de qué imagen elige la vista previa de WhatsApp para una tarjeta.
// No hay suite en el repo: se corre con `node scripts/probar-vista-previa.mjs`.
import assert from 'node:assert/strict';
import { imagenDeTarjeta } from '../src/lib/imagenVistaPrevia.js';

const SITIO = 'https://fxestudio.com.ar';
const RESPALDO = '/allegories/cenicienta/fondo.jpeg';
const elegir = (data, plantilla) => imagenDeTarjeta(data, plantilla, { sitio: SITIO, respaldo: RESPALDO });

// ── Lo de siempre: portada del cliente, luego galería, luego el diseño ───────
assert.equal(elegir({ heroImage: 'https://x.supabase.co/a.webp' }, null), 'https://x.supabase.co/a.webp');
assert.equal(elegir({ heroImage: '/allegories/x/p.webp' }, null), `${SITIO}/allegories/x/p.webp`);
assert.equal(elegir({ galleryPhotos: ['https://x.co/1.webp'] }, null), 'https://x.co/1.webp');
assert.equal(
  elegir({ heroImage: 'https://x.co/h.webp', galleryPhotos: ['https://x.co/1.webp'] }, null),
  'https://x.co/h.webp',
);
assert.equal(elegir({}, { previewImage: '/allegories/boda/p.webp' }), `${SITIO}/allegories/boda/p.webp`);
assert.equal(elegir({}, null), `${SITIO}${RESPALDO}`);
assert.equal(elegir(undefined, undefined), `${SITIO}${RESPALDO}`);

// ── El logo de la empresa, si es una imagen que WhatsApp pueda mostrar ───────
assert.equal(elegir({ logoUrl: 'https://x.co/logo.png' }, null), 'https://x.co/logo.png');
assert.equal(elegir({ logoUrl: 'https://x.co/logo.JPG?v=2' }, null), 'https://x.co/logo.JPG?v=2');
// La portada del cliente le gana al logo; el logo le gana al diseño.
assert.equal(elegir({ heroImage: 'https://x.co/h.webp', logoUrl: 'https://x.co/logo.png' }, null), 'https://x.co/h.webp');
assert.equal(
  elegir({ logoUrl: 'https://x.co/logo.png' }, { previewImage: '/allegories/boda/p.webp' }),
  'https://x.co/logo.png',
);
// Un SVG no se muestra en la vista previa: se ignora y sigue la cadena.
assert.equal(elegir({ logoUrl: 'https://x.co/logo.svg' }, null), `${SITIO}${RESPALDO}`);

// ── La imagen neutra del diseño, para que no salga la marca de otra empresa ──
// `ogImage` es sólo para tarjetas entregadas; `previewImage` es la vidriera.
assert.equal(
  elegir({}, { previewImage: '/allegories/evento/muestra.webp', ogImage: '/allegories/evento/neutra.webp' }),
  `${SITIO}/allegories/evento/neutra.webp`,
);
assert.equal(
  elegir({ logoUrl: 'https://x.co/logo.png' }, { ogImage: '/allegories/evento/neutra.webp' }),
  'https://x.co/logo.png',
);

console.log('imagenVistaPrevia: todo en orden');
