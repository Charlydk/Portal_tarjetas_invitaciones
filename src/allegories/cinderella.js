// Cenicienta — reference allegory.
// Wording is modeled on a real delivered card (mis15paulinag): every heading is
// re-told inside the fairy tale instead of naming the module. That re-telling is
// what makes a card feel written for the client rather than filled in.

export const cinderella = {
  id: 'cinderella-midnight',
  name: 'Cenicienta',
  ornament: 'sparkles',

  // The allegory owns every asset it needs, so moving a design between projects
  // means moving one file plus its folder under public/allegories/.
  audio: '/allegories/cenicienta/valse.mp3',

  // Premium: the background still is a painting, so it can carry gold dust and
  // a slow zoom without competing with itself.
  tier: 'premium',
  ambience: {
    particles: 'sparkles',
    kenBurns: true,
    magicLight: true,
    vignette: true,
  },

  sections: [
    'hero',
    'story',
    'party',
    'countdown',
    'rsvp',
    'dresscode',
    'gifts',
    'gallery',
    'closing',
  ],

  tokens: {
    bg: '#0A1430',
    surface: 'rgba(126,160,224,0.10)',
    ink: '#F4F1E8',
    inkMuted: 'rgba(233,238,252,0.74)',
    accent: '#F0C75E',
    accentInk: '#1B1405',
    // Display face for headings only. Body copy stays on Lato: the reference
    // card set six-line paragraphs in its display face and they were exhausting
    // to read.
    fontTitle: "'Cinzel Decorative', 'Cormorant Garamond', serif",
    fontBody: "'Lato', system-ui, sans-serif",
    titleSpacing: '0.04em',
    radius: '16px',
    backgroundImage: '/allegories/cenicienta/fondo.jpeg',
    backgroundVideo: '/allegories/cenicienta/video.mp4',
    heroVeil: 'rgba(4,10,32,0.42)',
    magic:
      'radial-gradient(ellipse 46% 34% at 50% 30%, rgba(255,225,160,0.20) 0%, rgba(210,180,120,0.07) 45%, transparent 72%)',
    scrim:
      'linear-gradient(180deg, rgba(6,14,40,0.90) 0%, rgba(8,18,48,0.78) 45%, rgba(6,12,34,0.92) 100%)',
  },

  // Gold medallions above each heading — the visual thread that held the
  // reference card together across sections.
  // Commissioned artwork, not glyphs. This is the difference a client pays for:
  // an emoji is on every phone, these were made for this card.
  icons: {
    party: '/allegories/cenicienta/party.webp',
    countdown: '/allegories/cenicienta/countdown.webp',
    rsvp: '/allegories/cenicienta/check.webp',
    dresscode: '/allegories/cenicienta/dresscode.webp',
    gifts: '/allegories/cenicienta/Gift.webp',
  },

  // Quinceañera, not a wedding — modelled on the delivered card.
  demo: {
    name1: 'Paulina',
    name2: '',
    welcomePhrase: '¡Mis 15 años!',
    invitePhrase: 'Con todo mi cariño te invito a compartir este cuento tan especial',
    story:
      'En mi corazón siempre hubo un sueño…\nMe soñaba vestida de princesa como un cuento de hadas. Hoy me levanto a contar mis quince primaveras, dejo atrás mi adorada infancia, que junto a mi familia y amigos muy feliz pasé.\nHoy mi sueño se hace realidad y con tu presencia quiero contar.',
    showCivil: false,
    showCeremony: false,
    showParty: true,
    partyPlace: 'Salón Recorcholis',
    eventVenue: 'Salón Recorcholis',
    partyAddress: 'Avenida Aconquija 1493',
    partyTime: '22:00 hs ¡Puntual!',
    alias: 'paupauu',
    dressCodeDescription: 'Elegante',
    dressCodeColorNote: 'El color celeste está reservado para la princesa.',
  },

  titles: {
    story: 'En mi corazón siempre hubo un sueño…',
    party: 'El Gran Baile',
    countdown: 'Antes de que den las doce…',
    rsvp: '¿Vendrás al Baile?',
    dresscode: 'Vestimenta para el Gran Baile',
    gifts: 'Un detalle para la princesa',
    gallery: 'Momentos mágicos',
    closing: '¡Gracias!',
  },

  copy: {
    countdownFoot: 'Cuando el reloj marque las doce, el cuento habrá comenzado.',
    rsvpBody: 'El carruaje ya está listo… Confirmá tu asistencia.',
    rsvpCta: 'Confirmar asistencia',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia al Gran Baile ✨',
    giftsBody:
      'Tu presencia es el mejor regalo en este día tan especial. Si querés acompañarme con un detalle para esta nueva etapa, lo voy a recibir con mucho cariño.',
    giftsChest: 'También habrá un cofre disponible en el salón.',
    galleryTagline: 'Un cuento que empezó hace tiempo',
    loading: 'Preparando el carruaje…',
    mapCta: 'Cómo llegar al castillo',
  },
};
