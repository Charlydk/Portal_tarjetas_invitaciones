// An allegory is the costume of an invitation: colors, type, wording and
// ornaments. The structure (which sections exist and how they behave) lives in
// src/features/invitation/. Adding a design means adding a file here — no JSX.

export const SECTION_IDS = [
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
];

// Neutral wording. An allegory overrides only the lines it wants to re-tell,
// so a half-written allegory still renders a complete, coherent card.
export const DEFAULT_TITLES = {
  story: 'Nuestra historia',
  civil: 'Ceremonia Civil',
  ceremony: 'Ceremonia Religiosa',
  party: 'La Fiesta',
  countdown: 'Faltan',
  rsvp: 'Confirmá tu asistencia',
  dresscode: 'Dress Code',
  gifts: 'Regalos',
  gallery: 'Galería',
  closing: '¡Gracias!',
};

export const DEFAULT_COPY = {
  countdownFoot: '¡Te esperamos!',
  rsvpBody: 'Tu presencia es lo más importante para nosotros.',
  rsvpCta: 'Confirmar asistencia',
  rsvpWhatsapp: '¡Hola! Confirmo mi asistencia 🎉',
  giftsBody:
    'Tu presencia es el mejor regalo. Si querés acompañarnos con un detalle, lo recibimos con muchísimo cariño.',
  giftsChest: 'También habrá un cofre disponible en el salón.',
  galleryTagline: '',
  // Shown while the hero video loads. Written in the allegory's own voice so
  // the wait belongs to the story instead of interrupting it.
  loading: 'Preparando tu invitación…',
  sharedAlbumCta: 'Compartí tus fotos',
  mapCta: 'Cómo llegar',
};

// Design tokens. Every value here becomes a CSS custom property, so sections
// never hardcode a color or a font — see invitation.css.
export const DEFAULT_TOKENS = {
  bg: '#101010',
  surface: 'rgba(255,255,255,0.05)',
  ink: '#F5F1EA',
  inkMuted: 'rgba(245,241,234,0.72)',
  // A light card can still have a dark hero over video. Falls back to `ink`.
  heroInk: '',
  accent: '#C9A96E',
  accentInk: '#1a1206',
  fontTitle: "'Cormorant Garamond', Garamond, serif",
  fontBody: "'Lato', system-ui, sans-serif",
  // Reserved for the hero name only. Faces with real character are unreadable
  // at paragraph size but carry a card when used once, huge.
  fontDisplay: '',
  // Breathing pool of light behind the content (premium ambience).
  magic: '',
  titleTransform: 'none',
  titleSpacing: '0.01em',
  // Dark halo suits dark cards; a light allegory must override it or its
  // headings look smudged.
  titleShadow: '0 2px 28px rgba(0,0,0,0.55)',
  radius: '14px',
  maxWidth: '620px',
  backgroundImage: '',
  // Where the background crops. A portrait illustration cropped at `center`
  // loses the faces, which is the only part that matters.
  backgroundPosition: 'center',
  // The hero can carry its own still, separate from the page background.
  heroImage: '',
  // A looping muted video behind the hero. Clients ask for this by name.
  backgroundVideo: '',
  heroVeil: 'rgba(0,0,0,0.45)',
  // Sits between the background image and the text. Without it, light photos
  // eat the copy — the single most common legibility failure in these cards.
  scrim: 'linear-gradient(180deg, rgba(8,12,26,0.82) 0%, rgba(8,12,26,0.72) 100%)',
};

/**
 * Merges an allegory over the defaults so a missing title or token can never
 * render as an empty heading or an unstyled section.
 */
export function resolveAllegory(allegory = {}) {
  return {
    id: allegory.id || 'default',
    name: allegory.name || 'Invitación',
    ornament: allegory.ornament || null,
    sections: allegory.sections?.length ? allegory.sections : SECTION_IDS,
    icons: allegory.icons || {},
    // Opt-in motion. An allegory without `ambience` renders exactly as before,
    // which is what keeps the animated designs a separate (premium) tier.
    ambience: allegory.ambience || null,
    // Sample content for the public preview. Without it every card showed the
    // same wedding couple, so a quinceañera design read as a wedding.
    demo: allegory.demo || {},
    tokens: { ...DEFAULT_TOKENS, ...allegory.tokens },
    titles: { ...DEFAULT_TITLES, ...allegory.titles },
    copy: { ...DEFAULT_COPY, ...allegory.copy },
  };
}

/**
 * Every image an allegory needs before the card can scroll without stuttering.
 * Feeds the preloader that runs behind the welcome screen.
 */
export function allegoryImages(allegory = {}) {
  const t = allegory.tokens || {};
  return [t.backgroundImage, t.heroImage, ...Object.values(allegory.icons || {})]
    .filter(Boolean);
}

/** Turns tokens into the `--inv-*` custom properties the stylesheet reads. */
export function tokensToCssVars(tokens) {
  return {
    '--inv-bg': tokens.bg,
    '--inv-surface': tokens.surface,
    '--inv-ink': tokens.ink,
    '--inv-ink-muted': tokens.inkMuted,
    '--inv-hero-ink': tokens.heroInk || tokens.ink,
    '--inv-accent': tokens.accent,
    '--inv-accent-ink': tokens.accentInk,
    '--inv-font-title': tokens.fontTitle,
    '--inv-font-display': tokens.fontDisplay || tokens.fontTitle,
    '--inv-font-body': tokens.fontBody,
    '--inv-magic': tokens.magic,
    '--inv-title-transform': tokens.titleTransform,
    '--inv-title-spacing': tokens.titleSpacing,
    '--inv-title-shadow': tokens.titleShadow,
    '--inv-radius': tokens.radius,
    '--inv-max-width': tokens.maxWidth,
    '--inv-scrim': tokens.scrim,
    '--inv-hero-veil': tokens.heroVeil,
    '--inv-bg-pos': tokens.backgroundPosition,
  };
}
