import React, { useEffect, useRef } from 'react';

/**
 * Drifting ambient particles on a canvas — generalised from the fireflies in the
 * delivered Aurora Gótica card.
 *
 * Each particle rises, drifts sideways on a sine wave and breathes its opacity,
 * drawn as a soft radial glow with a brighter core. The breathing is what reads
 * as "alive"; a constant-opacity field looks like falling dust.
 *
 * Only add a preset to an allegory whose artwork is still. Layering particles
 * over a video that already moves reads as noise, not craft.
 */
const PARTICLE_PRESETS = {
  // Aurora Gótica: yellow-green, unmistakably insects in a dark forest.
  fireflies: { count: 45, hueFrom: 82, hueTo: 127, sat: 85, size: 1.6, rise: 1, pulse: 2.4 },
  // Cenicienta: gold, smaller and slower — magic dust rather than living things.
  sparkles: { count: 38, hueFrom: 38, hueTo: 52, sat: 92, size: 1.1, rise: 0.55, pulse: 3.4 },
  // Boda Clásica: little hearts drifting up, echoing the ones drawn into the
  // card's own illustration.
  hearts: { count: 18, hueFrom: 8, hueTo: 22, sat: 72, size: 2.2, rise: 0.5, pulse: 1.4, shape: 'heart' },
  // Warm white specks, barely there. Restraint is the whole point.
  motes: { count: 24, hueFrom: 34, hueTo: 48, sat: 30, size: 1.3, rise: 0.4, pulse: 1.6 },
};

const SPRITE_BUCKETS = 6;
const SPRITE_SIZE = 64;

/**
 * Pre-renders each particle look once into a small offscreen canvas.
 *
 * Building a radial gradient per particle per frame meant ~2700 gradient
 * objects a second at 45 particles, and that competes with scrolling on a
 * modest machine. Drawing a cached bitmap costs almost nothing.
 */
function buildSprites(cfg) {
  return Array.from({ length: SPRITE_BUCKETS }, (_, i) => {
    const hue = cfg.hueFrom + ((cfg.hueTo - cfg.hueFrom) * i) / (SPRITE_BUCKETS - 1);
    const c = document.createElement('canvas');
    c.width = c.height = SPRITE_SIZE;
    const g = c.getContext('2d');
    const mid = SPRITE_SIZE / 2;

    if (cfg.shape === 'heart') {
      // heartPath spans roughly -0.25s to +0.9s vertically, so it is offset up
      // by 0.3s to sit centred inside the sprite instead of clipping.
      const s = SPRITE_SIZE * 0.7;
      g.fillStyle = `hsl(${hue}, ${cfg.sat}%, 68%)`;
      heartPath(g, mid, mid - s * 0.3, s);
      g.fill();
      return c;
    }

    const glow = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
    glow.addColorStop(0, `hsla(${hue}, ${cfg.sat}%, 72%, 1)`);
    glow.addColorStop(0.4, `hsla(${hue}, ${cfg.sat - 5}%, 58%, 0.35)`);
    glow.addColorStop(1, `hsla(${hue}, ${cfg.sat - 15}%, 45%, 0)`);
    g.fillStyle = glow;
    g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

    g.beginPath();
    g.arc(mid, mid, SPRITE_SIZE * 0.05, 0, Math.PI * 2);
    g.fillStyle = `hsla(${hue + 18}, 100%, 92%, 0.88)`;
    g.fill();
    return c;
  });
}

/** Traces a heart centred on (x, y), `s` wide. */
function heartPath(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.35);
  ctx.bezierCurveTo(x, y + s * 0.1, x - s * 0.5, y - s * 0.25, x - s * 0.5, y + s * 0.05);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.4, x - s * 0.1, y + s * 0.65, x, y + s * 0.9);
  ctx.bezierCurveTo(x + s * 0.1, y + s * 0.65, x + s * 0.5, y + s * 0.4, x + s * 0.5, y + s * 0.05);
  ctx.bezierCurveTo(x + s * 0.5, y - s * 0.25, x, y + s * 0.1, x, y + s * 0.35);
  ctx.closePath();
}

function AmbientParticles({ preset = 'fireflies', count, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const cfg = PARTICLE_PRESETS[preset] || PARTICLE_PRESETS.fireflies;
    const total = count ?? cfg.count;

    const sprites = buildSprites(cfg);
    let particles = [];
    let frame = 0;
    let rafId;

    const seed = () => {
      const { width: W, height: H } = canvas;
      particles = Array.from({ length: total }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.85 + H * 0.05,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -(Math.random() * 0.38 + 0.12) * cfg.rise,
        r: Math.random() * cfg.size + 0.7,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.028 + 0.018,
        bucket: Math.floor(Math.random() * SPRITE_BUCKETS),
        baseOp: Math.random() * 0.45 + 0.3,
      }));
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      seed();
    };

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      frame += 1;

      for (const p of particles) {
        p.x += p.vx + Math.sin(p.phase + frame * p.speed * 0.7) * 0.22;
        p.y += p.vy;
        p.phase += p.speed;

        if (p.y < -12) { p.y = H + 6; p.x = Math.random() * W; }
        if (p.x < -12) p.x = W + 6;
        if (p.x > W + 12) p.x = -6;

        const op = p.baseOp * (0.45 + 0.55 * Math.sin(p.phase * cfg.pulse));
        const size = p.r * 11;

        ctx.globalAlpha = Math.max(0, Math.min(1, op));
        ctx.drawImage(sprites[p.bucket], p.x - size / 2, p.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [preset, count]);

  return <canvas ref={canvasRef} className={`inv-particles ${className}`} aria-hidden="true" />;
}

export default AmbientParticles;
