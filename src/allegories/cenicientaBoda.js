import { cinderella } from './cinderella.js';

// Cenicienta, dressed as a wedding.
//
// Navy and gold read as formal on their own, so this one covers the classic end
// of the range where Boda Caricatura covers the informal one.
//
// PENDING ART: the civil and religious ceremony sections have no medallion yet —
// the delivered card never had those sections, so the artwork does not exist.
// They render with the ornament and heading only until the two pieces are made.

export const cenicientaBoda = {
  ...cinderella,

  id: 'cenicienta-boda',
  name: 'Boda de Cuento',

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
    ...cinderella.titles,
    story: 'Nuestra historia',
    civil: 'Ceremonia Civil',
    ceremony: 'La Ceremonia',
    // Kept from the quinceañera: they belong to the palace, not to the age.
    party: 'El Baile de los Novios',
    countdown: 'Hasta que empiece el cuento',
    rsvp: '¿Nos acompañás?',
    dresscode: 'Vestimenta de gala',
    gifts: 'Un detalle para los novios',
    gallery: 'Nuestros momentos',
  },

  copy: {
    ...cinderella.copy,
    countdownFoot: 'Cuando el reloj marque las doce, el cuento habrá comenzado.',
    countdownPassed: '¡Llegó nuestro día!',
    rsvpBody: 'El carruaje ya está listo… Confirmanos tu asistencia.',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia al Gran Baile ✨',
    giftsBody:
      'Tu presencia es el mejor regalo. Si querés acompañarnos con un detalle, lo recibimos con muchísimo cariño.',
    galleryTagline: 'Un cuento que empezó hace tiempo',
    loading: 'Preparando el carruaje…',
  },

  demo: {
    name1: 'Camila',
    name2: 'Julián',
    welcomePhrase: '¡Nos Casamos!',
    invitePhrase: 'Junto a nuestras familias te invitamos a celebrar nuestro casamiento',
    story:
      'Nuestra historia empezó con una noche cualquiera que terminó siendo la más importante de todas.\nHoy queremos que estés cuando la escribamos completa.',
    showCivil: true,
    showCeremony: true,
    showParty: true,
    dressCodeDescription: 'Elegante',
    dressCodeColorNote: 'El blanco está reservado para la novia.',
  },
};
