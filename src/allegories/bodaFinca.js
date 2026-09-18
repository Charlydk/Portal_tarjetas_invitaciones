// Boda en la Finca — la Boda Sobria en terracota.
//
// Para bodas al aire libre, en finca o bodega: terracota, arena y un verde
// oliva para las marcas chicas. La letra manuscrita es más suelta que en las
// otras, porque una fiesta entre viñedos no es un salón de gala.

import { bodaSobria } from './bodaSobria';

const ICONOS = '/allegories/boda-sobria/iconos';

export const bodaFinca = {
  ...bodaSobria,
  id: 'boda-finca',
  name: 'Boda en la Finca',

  tokens: {
    ...bodaSobria.tokens,

    // Arena, no blanco: el papel ya tiene el color de la tierra.
    bg: '#F6EFE6',
    surface: 'rgba(169,85,58,0.07)',
    ink: '#3B2A22',
    inkMuted: 'rgba(59,42,34,0.74)',

    accent: '#A9553A',
    accentInk: '#FFFFFF',
    accentAlt: '#6E7250',

    fontDisplay: "'Dancing Script', 'Great Vibes', cursive",
    fontHeading: "'Dancing Script', 'Great Vibes', cursive",
    fontBody: "'Lato', system-ui, sans-serif",
    titleTransform: 'none',
    titleSpacing: '0.01em',
    titleSize: 'var(--inv-step-3)',

    heroEdge: 'fade',

    bandStrong: '#A9553A',
    bandSoft: '#EFE3D4',
    bandStrongInk: '#FFFFFF',
  },

  icons: {
    party: `${ICONOS}/copas.svg`,
    schedule: `${ICONOS}/reloj.svg`,
    rsvp: `${ICONOS}/sobre.svg`,
    dresscode: `${ICONOS}/percha.svg`,
    gifts: `${ICONOS}/regalo.svg`,
    gallery: `${ICONOS}/camara.svg`,
  },

  // Pareja y lugar inventados: la vidriera es pública.
  demo: {
    ...bodaSobria.demo,
    name1: 'Florencia',
    name2: 'Joaquín',
    invitePhrase: 'Te esperamos entre viñedos para celebrar juntos',
    partyDateString: '6 de Marzo de 2027',
    partyTime: '19:00 hs',
    eventVenue: 'Finca El Algarrobo',
    partyAddress: 'Valle de Uco, Mendoza',
    dressCodeDescription: 'Elegante sport · Calzado cómodo',
    dressCodeColorNote: 'La fiesta es sobre césped: mejor sin tacos finos.',
    heroImage: '/allegories/boda-finca/portada-muestra.webp',
    alias: 'flor.joaco.boda',
    accountHolder: 'Florencia Guzmán',
    schedule: [
      { time: '19:00', label: 'Ceremonia al atardecer' },
      { time: '19:45', label: 'Recepción' },
      { time: '21:30', label: 'Cena' },
      { time: '23:30', label: 'Baile' },
    ],
  },
};
