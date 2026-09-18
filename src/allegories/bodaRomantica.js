// Boda Romántica — la Boda Sobria en rosa empolvado.
//
// Para bodas de día: rosa viejo, verde salvia y papel blanco rosado. La foto
// va apoyada sobre la hoja con un passe-partout, como una lámina, y el cuerpo
// del texto en una serif, que es lo que le da el tono de carta.

import { bodaSobria } from './bodaSobria';

const ICONOS = '/allegories/boda-sobria/iconos';

export const bodaRomantica = {
  ...bodaSobria,
  id: 'boda-romantica',
  name: 'Boda Romántica',

  tokens: {
    ...bodaSobria.tokens,

    bg: '#FBF6F4',
    surface: 'rgba(169,100,109,0.07)',
    ink: '#3A2E30',
    inkMuted: 'rgba(58,46,48,0.74)',

    // Rosa viejo y no rosa claro: es el color del texto de los títulos, y un
    // rosa pálido sobre papel claro no se lee.
    accent: '#A9646D',
    accentInk: '#FFFFFF',
    accentAlt: '#8FA08A',

    fontDisplay: "'Parisienne', 'Great Vibes', cursive",
    fontHeading: "'Parisienne', 'Great Vibes', cursive",
    fontBody: "'EB Garamond', Georgia, serif",
    titleTransform: 'none',
    titleSpacing: '0.01em',
    titleSize: 'var(--inv-step-3)',

    heroEdge: 'frame',

    // Con texto blanco encima: por eso el rosa de la banda es el oscuro de la
    // paleta. Uno más claro deja el blanco sin contraste.
    bandStrong: '#A9646D',
    bandSoft: '#F6ECEA',
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
    name1: 'Julieta',
    name2: 'Nicolás',
    invitePhrase: 'Con mucha alegría queremos compartir este día con vos',
    partyDateString: '17 de Abril de 2027',
    partyTime: '13:00 hs',
    eventVenue: 'Casona Los Tilos',
    partyAddress: 'Chacras de Coria, Mendoza',
    dressCodeDescription: 'Elegante sport',
    dressCodeColorNote: 'El blanco es de uso exclusivo de la novia.',
    heroImage: '/allegories/boda-romantica/portada-muestra.webp',
    alias: 'juli.nico.boda',
    accountHolder: 'Julieta Sosa',
    schedule: [
      { time: '13:00', label: 'Ceremonia' },
      { time: '13:30', label: 'Brindis' },
      { time: '14:30', label: 'Almuerzo' },
      { time: '17:00', label: 'Baile' },
    ],
  },
};
