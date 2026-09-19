// Cumpleaños Champagne — el Cumpleaños Dorado a plena luz.
//
// Nació de la misma clienta de los 50: eligió la Dorada y pidió "más claridad,
// más brillo" en el fondo, porque el salón va decorado en plateado y dorado.
// Sus referencias eran todas claras: marfil, encaje, mariposas doradas. Misma
// estructura que la Dorada (medallón, bandas, títulos manuscritos); cambia la
// luz. Las mariposas se pintan con un degradé de oro a plata, que es el par de
// metales del salón.

import { cumpleDorado } from './cumpleDorado';

export const cumpleChampagne = {
  ...cumpleDorado,
  id: 'cumple-champagne',
  name: 'Cumpleaños Champagne',

  // Sin viñeta: oscurecer los bordes de un fondo claro lo ensucia. La luz que
  // respira sí queda, cálida, y es lo que le da el brillo que pidió.
  ambience: {
    magicLight: true,
  },

  tokens: {
    ...cumpleDorado.tokens,

    // Marfil, no blanco: con blanco puro el dorado se ve amarillo.
    bg: '#FBF7EF',
    surface: 'rgba(168,129,47,0.07)',
    ink: '#3A3226',
    inkMuted: 'rgba(58,50,38,0.74)',
    heroInk: '#3A3226',
    titleShadow: 'none',

    // Oro viejo para el texto: el dorado brillante sobre marfil no se lee.
    accent: '#A8812F',
    accentInk: '#FFFFFF',
    // Plata para las marcas chicas.
    accentAlt: '#9AA3AD',

    bandStrong: '#F1E6CF',
    bandSoft: '#FBF7EF',
    bandStrongInk: '#3A3226',
    bandStrongAccent: '#A8812F',

    decorImage: '/allegories/cumple-mariposas/mariposa.webp',
    decorFill: 'linear-gradient(135deg, #B8912F 0%, #E9CF86 40%, #C3C8CF 75%, #9AA3AD 100%)',
    decorGlow: 'drop-shadow(0 0 4px rgba(233,207,134,0.55))',

    magic:
      'radial-gradient(ellipse 55% 40% at 50% 26%, rgba(255,233,180,0.55) 0%, rgba(255,245,220,0.25) 45%, transparent 72%)',
  },

  demo: {
    ...cumpleDorado.demo,
    name1: 'Susana',
  },
};
