// Mariposas — built from the real card (invitacion-mariposas).
//
// The modern one of the set: neon on black instead of a fairy tale. Its video
// is pure black with glowing butterflies, so the hero veil stays very light —
// anything heavier and the glow dies.

export const mariposas = {
  id: 'mariposas-neon',
  name: 'Mariposas',
  ornament: 'butterflies',

  audio: '/allegories/mariposas/audio.mp3',

  // The neon butterflies in the video already carry the motion, and the black
  // background would swallow particles anyway. Entrance and vignette only.
  // No Ken Burns: the background is a flat graphic, not a photograph. Zooming a
  // drawn emblem looks like a mistake, not like depth.
  ambience: {
    vignette: true,
  },

  sections: [
    'hero',
    'story',
    'ceremony',
    'party',
    'countdown',
    'rsvp',
    'dresscode',
    'gifts',
    'gallery',
    'closing',
  ],

  // Black, as delivered: the neon butterfly ring only glows against black. The
  // lavender file in the repo (main_section_background5) is an unused leftover
  // and is not what the card ships with.
  tokens: {
    bg: '#050409',
    surface: 'rgba(199,125,255,0.10)',
    ink: '#F4EEFF',
    inkMuted: 'rgba(238,230,255,0.76)',
    accent: '#C77DFF',
    accentInk: '#15071F',
    fontTitle: "'Great Vibes', cursive",
    fontBody: "'Lato', system-ui, sans-serif",
    titleSpacing: '0.02em',
    radius: '18px',
    backgroundImage: '/allegories/mariposas/fondo.webp',
    heroImage: '/allegories/mariposas/poster.webp',
    backgroundVideo: '/allegories/mariposas/video.mp4',
    // Light scrim: the ring is the point, so it must stay visible.
    scrim:
      'linear-gradient(180deg, rgba(5,4,9,0.78) 0%, rgba(14,8,24,0.62) 45%, rgba(4,3,8,0.84) 100%)',
    heroVeil: 'rgba(3,2,6,0.22)',
  },

  icons: {
    story: '/allegories/mariposas/mariposas.webp',
    ceremony: '/allegories/mariposas/iglesia.webp',
    rsvp: '/allegories/mariposas/sobre.webp',
    dresscode: '/allegories/mariposas/dresscode.webp',
    gifts: '/allegories/mariposas/regalo.webp',
  },

  demo: {
    name1: 'Milagros',
    name2: '',
    welcomePhrase: '¡Mis 15 años!',
    invitePhrase: 'Te invito a acompañarme la noche en que abro las alas',
    story:
      'Durante quince años fui creciendo despacio, sin apuro, guardada.\nHoy llega la noche de abrir las alas — y no quiero volar sin vos.',
    showCivil: false,
    showCeremony: false,
    showParty: true,
    dressCodeDescription: 'Elegante',
  },

  titles: {
    story: 'Mi metamorfosis',
    ceremony: 'Misa de Acción de Gracias',
    party: 'Mi Gran Noche',
    countdown: 'Falta muy poco para volar',
    rsvp: '¿Volás conmigo?',
    dresscode: 'Cómo vestirte',
    gifts: 'Un detalle para mí',
    gallery: 'Mis momentos',
    closing: '¡Gracias!',
  },

  copy: {
    countdownFoot: 'Ya casi es hora de abrir las alas.',
    countdownPassed: '¡Llegó la noche de volar!',
    rsvpBody: 'Quiero que estés ahí cuando levante vuelo.',
    rsvpCta: 'Confirmar asistencia',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia 🦋',
    giftsBody:
      'Tu presencia es el mejor regalo en este día tan especial. Si querés acompañarme con un detalle, lo voy a recibir con mucho cariño.',
    giftsChest: 'También habrá un cofre disponible en el salón.',
    galleryTagline: 'Antes de volar',
    loading: 'Abriendo las alas…',
    mapCta: 'Cómo llegar',
    scrollHint: 'Seguí las mariposas',
  },
};
