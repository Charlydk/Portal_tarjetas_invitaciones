/**
 * Tokens de la puerta de bienvenida.
 *
 * Viven aparte del componente porque un archivo que exporta funciones junto a
 * componentes rompe el recambio en caliente de Vite.
 */

export const DEFAULT_GATE = {
  accent: '#C9A96E',
  bg: 'linear-gradient(160deg, #0e0b07 0%, #1c1508 55%, #0e0b07 100%)',
  // `bg` may be a gradient, so text sitting on the accent needs its own token.
  accentInk: '#0e0b07',
  ink: '#FAF7F2',
  fontTitle: "'Playfair Display', 'Georgia', serif",
  fontBody: "'EB Garamond', 'Garamond', serif",
};

export function gateThemeFor(variant) {
  const t = variant?.allegory?.tokens;
  if (!t) return DEFAULT_GATE;
  return {
    accent: t.accent,
    bg: t.bg,
    accentInk: t.accentInk,
    ink: t.ink,
    fontTitle: t.fontTitle,
    fontBody: t.fontBody,
    bgImage: t.backgroundImage,
    bgVideo: t.backgroundVideo,
    scrim: t.scrim,
  };
}

/** Adds alpha to a hex token so the gate can dim its own ink without a second token. */
export function fade(color, alpha) {
  return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

// ── Pantalla de bienvenida ────────────────────────────────────────────────────
