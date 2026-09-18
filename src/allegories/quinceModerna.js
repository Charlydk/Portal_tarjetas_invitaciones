// 15 Moderna — la estructura de la Boda Sobria llevada a unos quince.
//
// Lila y violeta sobre blanco, sin ramas: una quinceañera no quiere una
// tarjeta de casamiento pintada de otro color. Todos los textos van en primera
// persona del singular, porque la que invita es ella.

import { bodaSobria } from './bodaSobria';

const ICONOS = '/allegories/boda-sobria/iconos';

export const quinceModerna = {
  ...bodaSobria,
  id: 'quince-moderna',
  name: '15 Moderna',

  tokens: {
    ...bodaSobria.tokens,

    bg: '#FCFAFE',
    surface: 'rgba(122,91,166,0.07)',
    ink: '#2E2638',
    inkMuted: 'rgba(46,38,56,0.74)',

    accent: '#7A5BA6',
    accentInk: '#FFFFFF',
    accentAlt: '#C7A6E8',

    fontDisplay: "'Great Vibes', 'Parisienne', cursive",
    fontHeading: "'Great Vibes', 'Parisienne', cursive",
    fontBody: "'DM Sans', system-ui, sans-serif",
    titleTransform: 'none',
    titleSpacing: '0.01em',
    titleSize: 'var(--inv-step-3)',

    heroEdge: 'fade',
    // Sin dibujo: lo que la hace moderna es el aire, no un adorno.
    decorImage: '',

    bandStrong: '#7A5BA6',
    bandSoft: '#F3EEFA',
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

  titles: {
    ...bodaSobria.titles,
    gallery: 'Mis fotos',
  },

  copy: {
    ...bodaSobria.copy,
    countdownFoot: '¡Te espero!',
    rsvpBody: 'Tu presencia es lo más importante para mí.',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia a tus 15 💜',
    giftsBody:
      'Tu presencia es el mejor regalo. Si querés acompañarme con un detalle, lo voy a recibir con muchísimo cariño.',
  },

  // Quinceañera y lugar inventados: la vidriera es pública.
  demo: {
    ...bodaSobria.demo,
    name1: 'Valentina',
    name2: '',
    welcomePhrase: 'Mis 15 años',
    invitePhrase: 'Te invito a celebrar conmigo una noche inolvidable',
    partyDateString: '9 de Octubre de 2026',
    partyTime: '22:00 hs',
    eventVenue: 'Salón Las Glicinas',
    partyAddress: 'Godoy Cruz, Mendoza',
    dressCodeDescription: 'Elegante',
    dressCodeColorNote: 'El lila está reservado para la quinceañera.',
    heroImage: '/allegories/quince-moderna/portada-muestra.webp',
    alias: 'valen.mis15',
    accountHolder: 'Carolina Benítez',
    giftsPhrase: 'Si querés hacerme un regalo, te dejo el alias.',
    schedule: [
      { time: '22:00', label: 'Recepción' },
      { time: '22:45', label: 'Entrada y vals' },
      { time: '23:15', label: 'Cena' },
      { time: '01:00', label: 'Baile' },
    ],
  },
};
