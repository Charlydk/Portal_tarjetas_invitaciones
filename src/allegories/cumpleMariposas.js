// Cumpleaños Mariposas — la versión premium del Cumpleaños Dorado.
//
// Misma estructura (medallón, bandas, títulos manuscritos) con la ambientación
// de Mariposas: el video de las mariposas de neón detrás de la portada, polvo
// fucsia flotando, y una mariposa de línea en cada sección pintada con un
// degradé fucsia-celeste y un halo, que es lo que la hace leer como neón.
// Colores más vivos que la Dorada a propósito: se ofrecen juntas, y la premium
// tiene que verse distinta a primera vista.

import { cumpleDorado } from './cumpleDorado';

export const cumpleMariposas = {
  ...cumpleDorado,
  id: 'cumple-mariposas',
  name: 'Cumpleaños Mariposas',
  tier: 'premium',

  ambience: {
    particles: 'neon',
    magicLight: true,
    vignette: true,
  },

  tokens: {
    ...cumpleDorado.tokens,

    // Negro violáceo: el fucsia sobre negro puro se ve duro; con un poco de
    // violeta en el fondo, brilla.
    bg: '#08040F',
    surface: 'rgba(232,121,249,0.08)',
    ink: '#F7EEFF',
    inkMuted: 'rgba(247,238,255,0.76)',
    heroInk: '#F7EEFF',

    accent: '#E879F9',
    accentInk: '#1A0620',
    // Celeste: la segunda mariposa del video.
    accentAlt: '#67E8F9',

    bandStrong: '#1B0B2E',
    bandSoft: '#08040F',
    bandStrongInk: '#F7EEFF',
    bandStrongAccent: '#E879F9',

    decorImage: '/allegories/cumple-mariposas/mariposa.webp',
    decorFill: 'linear-gradient(135deg, #F0ABFC 0%, #E879F9 45%, #67E8F9 100%)',
    decorGlow: 'drop-shadow(0 0 6px rgba(232,121,249,0.65))',

    heroBackdropVideo: '/allegories/mariposas/video.mp4',

    magic:
      'radial-gradient(ellipse 50% 36% at 50% 28%, rgba(232,121,249,0.18) 0%, rgba(103,232,249,0.06) 45%, transparent 72%)',
  },

  copy: {
    ...cumpleDorado.copy,
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia a tu cumple 🦋',
    scrollHint: 'Seguí las mariposas',
  },

  demo: {
    ...cumpleDorado.demo,
    name1: 'Mónica',
  },
};
