// Rapunzel — second allegory, built from the real card (invitacion-15-rapunzel).
//
// Same sections and same renderer as Cenicienta. Only the costume changes:
// palette, type, wording, artwork. That is the whole cost of a new design.

export const rapunzel = {
  id: 'rapunzel-luces',
  name: 'Rapunzel',
  ornament: 'lanterns',

  audio: '/allegories/rapunzel/audio.mp3',

  // No particles on purpose: the hero video is already full of floating
  // lanterns. Adding a second layer of drifting lights would read as noise.
  // Same reasoning as Mariposas: the page background is the drawn sun emblem,
  // and a flat graphic should not drift or zoom.
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

  tokens: {
    // Purple and gold taken from the delivered card (#5D3A6B / #ffd700).
    bg: '#2E1B47',
    surface: 'rgba(206,178,255,0.10)',
    ink: '#FBF3E4',
    inkMuted: 'rgba(244,236,255,0.78)',
    accent: '#F2C75C',
    accentInk: '#2A1A05',
    fontTitle: "'Dancing Script', 'Great Vibes', cursive",
    fontBody: "'Lato', system-ui, sans-serif",
    titleSpacing: '0.01em',
    radius: '20px',
    // Page background is the sun emblem from the delivered card, not a lantern
    // still: the lanterns belong to the hero video, and repeating them behind
    // every section flattened the whole card into one texture.
    backgroundImage: '/allegories/rapunzel/fondo.webp',
    heroImage: '/allegories/rapunzel/poster.webp',
    backgroundVideo: '/allegories/rapunzel/video.mp4',
    scrim:
      'linear-gradient(180deg, rgba(30,17,50,0.86) 0%, rgba(46,27,71,0.72) 45%, rgba(24,13,42,0.90) 100%)',
    // Warmer and lighter than the page scrim: the lanterns have to glow through.
    heroVeil: 'rgba(28,14,44,0.38)',
  },

  icons: {
    story: '/allegories/rapunzel/sol.webp',
    ceremony: '/allegories/rapunzel/iglesia.webp',
    party: '/allegories/rapunzel/farolitos.webp',
    rsvp: '/allegories/rapunzel/sobre.webp',
    dresscode: '/allegories/rapunzel/pascal.webp',
    gifts: '/allegories/rapunzel/regalo.webp',
  },

  demo: {
    name1: 'Zoe',
    name2: '',
    welcomePhrase: '¡Mis 15 años!',
    invitePhrase: 'Te invito a acompañarme la noche en que se encienden las luces',
    story:
      'Pasé años mirando las luces desde la ventana de mi torre, preguntándome cómo se verían de cerca.\nEsta noche por fin salgo a encontrarlas, y quiero que estés ahí cuando eso pase.',
    showCivil: false,
    showCeremony: false,
    showParty: true,
    dressCodeDescription: 'Elegante',
  },

  titles: {
    story: 'Siempre miré las luces desde mi torre…',
    ceremony: 'Misa de Acción de Gracias',
    party: 'La Noche de las Luces',
    countdown: 'Faltan para que suban las luces',
    rsvp: '¿Vendrás a ver las luces?',
    dresscode: 'Vestimenta para la noche',
    gifts: 'Un detalle para la princesa',
    gallery: 'Momentos desde la torre',
    closing: '¡Gracias!',
  },

  copy: {
    countdownFoot: 'Cuando suban los farolitos, empieza mi sueño.',
    countdownPassed: '¡Las luces ya están en el cielo!',
    rsvpBody: 'Ya solté mi trenza… ahora sólo falta que vengas.',
    rsvpCta: 'Confirmar asistencia',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia a la Noche de las Luces 🏮',
    giftsBody:
      'Tu presencia es el mejor regalo en este día tan especial. Si querés acompañarme con un detalle para esta nueva etapa, lo voy a recibir con mucho cariño.',
    giftsChest: 'También habrá un cofre disponible en el salón.',
    galleryTagline: 'Los años en la torre',
    loading: 'Encendiendo los farolitos…',
    mapCta: 'Cómo llegar',
    scrollHint: 'Seguí las luces',
  },
};
