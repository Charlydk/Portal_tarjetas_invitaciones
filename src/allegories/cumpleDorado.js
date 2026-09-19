// Cumpleaños Dorado — negro, dorado y brillo, para cumpleaños de grandes.
//
// Nació del pedido de unos 50: la clienta trajo de referencia tarjetas negras
// con marco dorado, destellos y mariposas lilas, y le había gustado la de
// Cenicienta por el brillo. Sale de la familia de Boda Sobria (bandas,
// títulos manuscritos, íconos de línea) con la luz que respira detrás del texto.
// Sin destellos flotando a propósito: son lo que distingue a la versión premium
// (Cumpleaños Mariposas), y se ofrecen juntas.
//
// La foto va en un medallón redondo con doble filete dorado. Recortada en
// círculo se queda con la cara y deja afuera el fondo, que en la foto de celular
// de una clienta casi nunca ayuda.

import { bodaNoche } from './bodaNoche';

export const cumpleDorado = {
  ...bodaNoche,
  id: 'cumple-dorado',
  name: 'Cumpleaños Dorado',

  ambience: {
    magicLight: true,
    vignette: true,
  },

  tokens: {
    ...bodaNoche.tokens,

    // Negro cálido, no azul: el dorado sobre negro es lo que pidió.
    bg: '#0C0A08',
    surface: 'rgba(212,175,106,0.08)',
    ink: '#F3EBDD',
    inkMuted: 'rgba(243,235,221,0.76)',
    heroInk: '#F3EBDD',

    accent: '#D4AF6A',
    accentInk: '#0C0A08',
    // Lila para las marcas chicas: las mariposas de sus referencias.
    accentAlt: '#B48AE0',

    heroEdge: 'medallion',

    bandStrong: '#1C1813',
    bandSoft: '#0C0A08',
    bandStrongInk: '#F3EBDD',
    bandStrongAccent: '#D4AF6A',

    magic:
      'radial-gradient(ellipse 50% 36% at 50% 28%, rgba(255,215,140,0.16) 0%, rgba(212,175,106,0.06) 45%, transparent 72%)',
  },

  titles: {
    ...bodaNoche.titles,
    party: 'Mi Fiesta',
    gifts: 'Regalo',
    closing: '¡Te espero!',
  },

  // Primera persona del singular: la que invita es ella.
  copy: {
    ...bodaNoche.copy,
    countdownFoot: '¡Te espero para brindar!',
    rsvpBody: 'Tu presencia es lo más importante para mí.',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia a tu cumple ✨',
    giftsBody:
      'Tu presencia es el mejor regalo. Si querés acompañarme con un detalle, lo voy a recibir con muchísimo cariño.',
    giftsChest: 'Habrá un cofre en la fiesta.',
  },

  // Inventada: la vidriera es pública.
  demo: {
    name1: 'Graciela',
    name2: '',
    welcomePhrase: 'Mis fabulosos 50',
    invitePhrase: 'Te invito a celebrar conmigo una noche para brindar por la vida',
    partyDateString: '21 de Noviembre de 2026',
    partyTime: '22:00 hs',
    eventVenue: 'Salón Los Jazmines',
    partyAddress: 'San Miguel de Tucumán',
    heroImage: '/allegories/quince-moderna/portada-muestra.webp',
    giftMode: 'cofre',
    showCivil: false,
    showCeremony: false,
    showSchedule: false,
    showDressCode: false,
    showGallery: false,
  },
};
