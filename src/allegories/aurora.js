// Aurora Gótica — built from the real card (invitacion-15-aurora-gotica).
//
// Deliberately the counterweight to Cenicienta and Rapunzel: no gold medallions,
// no glow. Photographs, faded roses and a dark forest. Proving the system holds
// a second visual language and not just variations of the first one.

export const aurora = {
  id: 'aurora-gotica',
  name: 'Aurora Gótica',
  ornament: 'thorns',
  tier: 'premium',

  audio: '/allegories/aurora/audio.mp3',

  // Premium ambience: this is what separates this allegory from a static card
  // and what justifies charging more for it. Fireflies, a slow zoom on the
  // background, a breathing pool of light and a resolving hero.
  ambience: {
    particles: 'fireflies',
    kenBurns: true,
    magicLight: true,
    vignette: true,
  },

  // No ceremony and no gifts — the delivered card did not carry them.
  sections: ['hero', 'story', 'party', 'countdown', 'rsvp', 'dresscode', 'gallery', 'closing'],

  tokens: {
    // Palette lifted from the card's CSS: #0d1109, #c9a96e, #f0e6d3, #8b2a3f.
    bg: '#0D1109',
    surface: 'rgba(201,169,110,0.08)',
    ink: '#F0E6D3',
    inkMuted: 'rgba(240,230,211,0.72)',
    accent: '#C9A96E',
    accentInk: '#12160E',
    // The three faces from the delivered card. Blackletter is unreadable in
    // paragraphs but carries the whole card when used once, huge, on the name —
    // it is where the "gótica" actually lives.
    fontDisplay: "'UnifrakturMaguntia', 'Cinzel', serif",
    fontTitle: "'Cinzel', Garamond, serif",
    fontBody: "'DM Sans', system-ui, sans-serif",
    titleSpacing: '0.06em',
    radius: '4px',
    heroImage: '/allegories/aurora/baile.webp',
    backgroundImage: '/allegories/aurora/fondo.webp',
    scrim:
      'linear-gradient(180deg, rgba(8,11,6,0.90) 0%, rgba(13,17,9,0.82) 45%, rgba(6,9,5,0.94) 100%)',
    heroVeil: 'rgba(6,10,5,0.34)',
    magic:
      'radial-gradient(ellipse 42% 36% at 58% 36%, rgba(160,255,190,0.22) 0%, rgba(120,200,160,0.08) 45%, transparent 70%)',
  },

  // Deliberately none: the delivered card uses no section medallions. Its
  // images are full-bleed backgrounds, and the unused files in the repo
  // (flores_antiguas, frase, pergamino) are leftovers, not icons.
  icons: {},

  demo: {
    name1: 'Allegra',
    name2: '',
    welcomePhrase: '¡Mis 15 años!',
    invitePhrase: 'Te espero en el bosque, la noche en que el hechizo se rompe',
    story:
      'Érase una vez, en un sueño, una noche que se repetía siempre igual.\nEsta vez el bosque despierta de verdad, y quiero que estés ahí para verlo.',
    showCivil: false,
    showCeremony: false,
    showParty: true,
    dressCodeDescription: 'Elegante Sport',
  },

  titles: {
    story: 'Érase una vez, en un sueño…',
    party: 'El Baile del Bosque',
    countdown: 'Antes de que caiga el hechizo…',
    rsvp: '¿Vendrás a mi sueño?',
    dresscode: 'Vestimenta para la noche',
    gallery: 'Mis momentos',
    closing: '¡Gracias!',
  },

  copy: {
    countdownFoot: 'El bosque ya está despertando.',
    countdownPassed: '¡El hechizo se rompió — llegó la noche!',
    rsvpBody: 'El bosque guarda un lugar para vos. Confirmá tu asistencia.',
    rsvpCta: 'Confirmar asistencia',
    giftsBody:
      'Tu presencia es el mejor regalo en este día tan especial. Si querés acompañarme con un detalle, lo voy a recibir con mucho cariño.',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia 🌹',
    galleryTagline: 'Lo que el bosque recuerda',
    loading: 'El bosque está despertando…',
    mapCta: 'Cómo llegar',
    scrollHint: 'Entrá al bosque',
  },
};
