import { aurora } from './aurora.js';

// Aurora Gótica, dressed as a wedding.
//
// This is what the allegory system is for. The look, the artwork, the fireflies
// and the premium tier all come across untouched; only the wording, the section
// list and the sample couple change. A design that took a day to build extends
// into a second segment for about twenty lines.

export const auroraBoda = {
  ...aurora,

  id: 'aurora-boda',
  name: 'Bosque Encantado',

  // A wedding runs the full sequence; the quinceañera version had neither
  // ceremony nor gifts.
  sections: [
    'hero',
    'story',
    'civil',
    'ceremony',
    'party',
    'countdown',
    'rsvp',
    'dresscode',
    'gifts',
    'gallery',
    'closing',
  ],

  titles: {
    ...aurora.titles,
    story: 'Nuestra historia',
    civil: 'Ceremonia Civil',
    ceremony: 'La Ceremonia',
    party: 'La Celebración',
    countdown: 'Falta muy poco',
    rsvp: '¿Nos acompañás?',
    dresscode: 'Vestimenta para la noche',
    gifts: 'Un detalle para los novios',
    gallery: 'Nuestros momentos',
  },

  // First person plural throughout: the quinceañera copy speaks as one person.
  copy: {
    ...aurora.copy,
    countdownFoot: 'Nos vemos muy pronto entre los árboles.',
    countdownPassed: '¡Llegó nuestro día!',
    rsvpBody: 'El bosque guarda un lugar para vos. Confirmanos tu asistencia.',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia 🌹',
    giftsBody:
      'Tu presencia es el mejor regalo. Si querés acompañarnos con un detalle, lo recibimos con muchísimo cariño.',
    giftsChest: 'También habrá un cofre disponible en el salón.',
    galleryTagline: 'Lo que fuimos construyendo',
    loading: 'El bosque está despertando…',
    scrollHint: 'Entrá al bosque',
  },

  demo: {
    name1: 'Sofía',
    name2: 'Tomás',
    welcomePhrase: '¡Nos Casamos!',
    invitePhrase: 'Junto a nuestras familias te invitamos a celebrar nuestro casamiento',
    story:
      'Nos encontramos sin buscarnos, en el lugar menos pensado, y desde entonces no nos soltamos más.\nHoy queremos dar el paso más importante rodeados de la gente que queremos.',
    showCivil: true,
    showCeremony: true,
    showParty: true,
    dressCodeDescription: 'Elegante',
  },
};
