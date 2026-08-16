import React from 'react';
import './Logo.css';

/**
 * Typographic wordmark for FX Estudio.
 *
 * Real text rather than an image, on purpose:
 * - stays sharp at any size, including a 32px favicon and a print-size header
 * - inherits colour, so the same mark works on cream, on gold and on a dark hero
 * - weighs nothing: Cinzel is already loaded for the cards
 * - readable by search engines and screen readers
 *
 * Cinzel is the same roman face Aurora Gótica uses for its headings, which is
 * what makes the studio and the product look like they belong together.
 */
function Logo({ tagline = false, className = '' }) {
  return (
    <span className={`fx-logo ${className}`}>
      <span className="fx-logo__mark" aria-hidden="true">FX</span>
      <span className="fx-logo__rule" aria-hidden="true" />
      <span className="fx-logo__body">
        <span className="fx-logo__name">Estudio</span>
        {tagline && <span className="fx-logo__tagline">Invitaciones Web &amp; Diseño</span>}
      </span>
      <span className="sr-only">FX Estudio — Invitaciones Web y Diseño</span>
    </span>
  );
}

export default Logo;
