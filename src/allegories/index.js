// An allegory is the costume of an invitation: colors, type, wording and
// ornaments. The structure (which sections exist and how they behave) lives in
// src/features/invitation/. Adding a design means adding a file here — no JSX.

export const SECTION_IDS = [
  'hero',
  'story',
  'civil',
  'ceremony',
  'party',
  'schedule',
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
  schedule: 'Itinerario',
  countdown: 'Faltan',
  rsvp: 'Confirmá tu asistencia',
  dresscode: 'Dress Code',
  gifts: 'Regalos',
  gallery: 'Galería',
  closing: '¡Gracias!',
};

export const DEFAULT_COPY = {
  countdownFoot: '¡Te esperamos!',
  scheduleBody: '',
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
  // Segundo acento, para marcas chicas: los puntos del cronograma, el ornamento.
  // Vacío cae en `accent`, así que ninguna alegoría vieja cambia.
  accentAlt: '',
  fontTitle: "'Cormorant Garamond', Garamond, serif",
  fontBody: "'Lato', system-ui, sans-serif",
  // Reserved for the hero name only. Faces with real character are unreadable
  // at paragraph size but carry a card when used once, huge.
  fontDisplay: '',
  // Sólo los títulos de sección. Separado de `fontTitle` porque esa también
  // dibuja los números de la cuenta regresiva y las horas del itinerario: una
  // cursiva ahí es bonita en un título y es ilegible en "23:45". Vacío cae en
  // `fontTitle`.
  fontHeading: '',
  // Tamaño de esos títulos. Una cursiva al tamaño de una sans se lee chica: su
  // altura de x es mucho menor. Vacío usa la escala normal.
  titleSize: '',
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
  // Cómo se relaciona la portada con los nombres.
  //   'overlay' (por defecto): la foto ocupa la pantalla y el texto va encima.
  //   'stacked': la foto va arriba, contenida, y los nombres debajo sobre el
  //   papel. Una foto vertical a sangre en un monitor ancho SIEMPRE se ve con
  //   zoom, porque hay que recortarla muchísimo para llenar el ancho.
  heroLayout: 'overlay',
  // El borde de la portada, cuando va apilada.
  //   ''       sin tratamiento, el rectángulo tal cual.
  //   'fade'   se desvanece hacia abajo y los nombres emergen del papel.
  //   'frame'  passe-partout del color del papel y sombra: una foto apoyada.
  heroEdge: '',
  // Un dibujo decorativo que acompaña las secciones, apareciendo a medida que
  // el invitado baja. Va detrás del texto y alternando de lado.
  decorImage: '',
  // Bandas de color alternadas, a todo el ancho: una fuerte y la siguiente
  // suave. Vacío, que es el valor por defecto, deja todas las secciones sobre
  // el fondo del papel. `bandStrongInk` es el color del texto sobre la fuerte.
  bandStrong: '',
  bandSoft: '',
  bandStrongInk: '#FFFFFF',
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
 * Lo que un cliente cambió de SU tarjeta, por encima del diseño.
 *
 * Hasta ahora personalizar una tarjeta para un cliente —otra letra, otros
 * colores, íconos— exigía un archivo de alegoría derivado: un commit y un
 * deploy por cliente, justo lo que dejamos de hacer cuando la tarjeta pasó a
 * ser una fila. Ahora esos cambios viven en la propia fila (`data.tokens`,
 * `data.titles`, `data.copy`, `data.icons`) y el diseño del catálogo queda
 * intacto para el próximo que lo elija.
 */
export function withCardOverrides(allegory, data = {}) {
  const { tokens, titles, copy, icons } = data || {};
  if (!tokens && !titles && !copy && !icons) return allegory;

  return {
    ...allegory,
    tokens: { ...allegory.tokens, ...tokens },
    titles: { ...allegory.titles, ...titles },
    copy: { ...allegory.copy, ...copy },
    icons: { ...allegory.icons, ...icons },
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
    '--inv-accent-alt': tokens.accentAlt || tokens.accent,
    '--inv-decor': tokens.decorImage ? `url("${tokens.decorImage}")` : 'none',
    '--inv-font-heading': tokens.fontHeading || tokens.fontTitle,
    '--inv-title-size': tokens.titleSize || 'var(--inv-step-2)',
    '--inv-band-strong': tokens.bandStrong || 'transparent',
    '--inv-band-soft': tokens.bandSoft || 'transparent',
    '--inv-band-strong-ink': tokens.bandStrongInk,
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
