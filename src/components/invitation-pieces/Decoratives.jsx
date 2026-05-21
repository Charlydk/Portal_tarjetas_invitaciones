import React from 'react';

/**
 * Divisor ornamental horizontal.
 * Hereda el color del elemento padre via CSS `color` → usa currentColor.
 * Colocá `.ornament-divider { color: var(--primary-color); }` en el CSS del skeleton.
 */
export function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <svg
        width="150"
        height="14"
        viewBox="0 0 150 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* líneas laterales */}
        <line x1="0"   y1="7" x2="60"  y2="7" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.35" />
        <line x1="90"  y1="7" x2="150" y2="7" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.35" />
        {/* diamante chico izquierdo */}
        <polygon points="65,4.5 68,7 65,9.5 62,7" fill="currentColor" fillOpacity="0.45" />
        {/* diamante grande central */}
        <polygon points="75,3   79,7   75,11  71,7"  fill="currentColor" fillOpacity="0.75" />
        {/* diamante chico derecho */}
        <polygon points="85,4.5 88,7 85,9.5 82,7" fill="currentColor" fillOpacity="0.45" />
      </svg>
    </div>
  );
}

/**
 * Línea fina decorativa. Útil para separar el nombre del "&" en el hero.
 */
export function ThinLine({ width = 48, opacity = 0.6 }) {
  return (
    <div
      className="thin-line"
      aria-hidden="true"
      style={{
        width,
        height: 1.5,
        background: 'var(--primary-color)',
        margin: '1.2rem auto',
        opacity,
        transformOrigin: 'center',
      }}
    />
  );
}
