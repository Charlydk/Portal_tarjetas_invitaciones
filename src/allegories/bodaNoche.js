// Boda de Noche — la Boda Sobria vestida de gala.
//
// Misma estructura, mismo trazo en los íconos y la rama; cambia el carácter.
// Azul noche y dorado, para fiestas que empiezan cuando cae el sol y salones
// formales. Es el opuesto de la Sobria en color, así que suma una opción real al
// catálogo en vez de una variación que nadie distingue.
//
// Todo lo que la Sobria resolvía por tarjeta —títulos manuscritos, bandas,
// íconos— acá viene de fábrica: es lo que define el diseño.

import { bodaSobria } from './bodaSobria';

const ICONOS = '/allegories/boda-sobria/iconos';

export const bodaNoche = {
  ...bodaSobria,
  id: 'boda-noche',
  name: 'Boda de Noche',

  tokens: {
    ...bodaSobria.tokens,

    // Azul noche y no negro: el negro puro en un teléfono se ve como pantalla
    // apagada, y el azul deja que el dorado brille sin parecer amarillo.
    bg: '#1C2230',
    surface: 'rgba(201,169,110,0.08)',
    ink: '#EDE6D6',
    inkMuted: 'rgba(237,230,214,0.74)',
    heroInk: '#EDE6D6',

    accent: '#C9A96E',
    accentInk: '#1C2230',
    accentAlt: '#E3CC9B',

    // Great Vibes en vez de Parisienne: tiene más cuerpo, y un trazo fino
    // dorado sobre fondo oscuro se pierde.
    fontDisplay: "'Great Vibes', 'Parisienne', cursive",
    fontHeading: "'Great Vibes', 'Parisienne', cursive",
    titleTransform: 'none',
    titleSpacing: '0.01em',
    titleSize: 'var(--inv-step-3)',

    // La foto enmarcada con un filete dorado. Desvanecida hacia un fondo
    // oscuro se oscurecía entera.
    heroEdge: 'line',

    // Noche y noche más clara. La diferencia es chica a propósito: en oscuro,
    // un salto fuerte de tono parte la tarjeta en pedazos.
    bandStrong: '#2A3347',
    bandSoft: '#1C2230',
    bandStrongInk: '#EDE6D6',
    bandStrongAccent: '#C9A96E',
  },

  // Los íconos de la Sobria: son máscaras, así que salen dorados solos.
  icons: {
    party: `${ICONOS}/copas.svg`,
    schedule: `${ICONOS}/reloj.svg`,
    rsvp: `${ICONOS}/sobre.svg`,
    dresscode: `${ICONOS}/percha.svg`,
    gifts: `${ICONOS}/regalo.svg`,
    gallery: `${ICONOS}/camara.svg`,
  },

  demo: {
    ...bodaSobria.demo,
    name1: 'Camila',
    name2: 'Tomás',
    invitePhrase: 'Queremos celebrar esta noche con vos',
    // Pareja generada, no un cliente.
    heroImage: '/allegories/boda-noche/portada-muestra.webp',
    dressCodeColorNote: 'El blanco es de uso exclusivo de la novia.',
    partyDateString: '14 de Noviembre de 2026',
    partyTime: '21:30 hs',
    eventVenue: 'Salón Las Magnolias',
    partyAddress: 'Ciudad de Mendoza',
    dressCodeDescription: 'Etiqueta · Formal',
    alias: 'camila.tomas.boda',
    accountHolder: 'Camila Romero',
  },
};
