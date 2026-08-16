// Boda Clásica — built from the real card (Tarjeta_Jan / janetyaxel).
//
// The only allegory that carries the full wedding sequence: civil, religious
// ceremony and party. Weddings are half the catalogue, so this is the one that
// has to hold the most sections without feeling long.

export const bodaClasica = {
  id: 'boda-caricatura',
  name: 'Boda Caricatura',
  ornament: 'rings',

  audio: '/allegories/boda-caricatura/audio.mp3',

  // Little hearts drifting up, taken from the ones drawn into the card's own
  // illustration. No Ken Burns: the illustration is the only image on the page,
  // so moving it would draw attention to its crop.
  ambience: {
    particles: 'hearts',
  },

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

  // The delivered card is a light watercolour illustration on white, not a dark
  // card. Cream and sky blue from its CSS (#F5F5DC / #87CEEB / #6EB5D2).
  tokens: {
    bg: '#FCFAF6',
    surface: 'rgba(44,122,158,0.09)',
    ink: '#26303A',
    inkMuted: 'rgba(38,48,58,0.86)',
    heroInk: '#FFFFFF',
    // The card's own sky blue (#6EB5D2) is decorative, not readable: as heading
    // colour on near-white it sat around 2:1 contrast. Darkened for text while
    // staying the same hue.
    accent: '#2C7A9E',
    accentInk: '#FFFFFF',
    fontTitle: "'Cormorant Garamond', Garamond, serif",
    fontBody: "'Lato', system-ui, sans-serif",
    titleSpacing: '0.05em',
    titleShadow: 'none',
    radius: '10px',
    // One image only, and cropped from the top so the faces survive the crop.
    // It used to appear here *and* as the hero poster, which read as a repeat.
    backgroundImage: '/allegories/boda-caricatura/fondo.webp',
    backgroundPosition: 'center 12%',
    heroImage: '/allegories/boda-caricatura/poster.webp',
    backgroundVideo: '/allegories/boda-caricatura/video.mp4',
    // Strong enough that body copy never lands on top of the drawing's detail.
    scrim:
      'linear-gradient(180deg, rgba(252,250,246,0.93) 0%, rgba(252,250,246,0.86) 42%, rgba(250,247,242,0.96) 100%)',
    heroVeil: 'rgba(18,34,43,0.38)',
  },

  icons: {
    story: '/allegories/boda-caricatura/nosotros.webp',
    civil: '/allegories/boda-caricatura/civil.webp',
    ceremony: '/allegories/boda-caricatura/iglesia.webp',
    party: '/allegories/boda-caricatura/fiesta.webp',
    rsvp: '/allegories/boda-caricatura/sobre.webp',
    dresscode: '/allegories/boda-caricatura/dresscode.webp',
    gifts: '/allegories/boda-caricatura/regalo.webp',
  },

  // The only wedding of the set, so the only one that shows civil + ceremony.
  demo: {
    name1: 'Janet',
    name2: 'Axel',
    welcomePhrase: '¡Nos Casamos!',
    invitePhrase: 'Junto a nuestras familias te invitamos a celebrar nuestro casamiento',
    story:
      'Nos conocimos sin buscarnos y desde entonces no nos soltamos más.\nHoy queremos dar el paso más importante rodeados de la gente que queremos.',
    showCivil: true,
    showCeremony: true,
    showParty: true,
    dressCodeDescription: 'Elegante',
  },

  titles: {
    story: 'Cómo empezó todo',
    civil: 'Ceremonia Civil',
    ceremony: 'Ceremonia Religiosa',
    party: 'La Fiesta',
    countdown: 'Falta muy poco para el sí',
    rsvp: '¿Nos acompañás?',
    dresscode: 'Cómo vestirse',
    gifts: 'Un detalle para los novios',
    gallery: 'Nosotros',
    closing: '¡Gracias!',
  },

  copy: {
    countdownFoot: '¡Nos vemos muy pronto!',
    countdownPassed: '¡Llegó el gran día!',
    rsvpBody: 'Tu presencia es lo más importante para nosotros.',
    rsvpCta: 'Confirmar asistencia',
    rsvpWhatsapp: '¡Hola! Confirmamos nuestra asistencia 💍',
    giftsBody:
      'Tu presencia es el mejor regalo. Si querés acompañarnos con un detalle, lo recibimos con muchísimo cariño.',
    giftsChest: 'También habrá un cofre disponible en el salón.',
    galleryTagline: 'Nuestros momentos',
    loading: 'Preparando todo para el gran día…',
    mapCta: 'Cómo llegar',
    scrollHint: 'Desplazá para ver más',
  },
};
