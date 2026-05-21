import { useEffect, useRef } from 'react';

const COLORS = [
  [219, 39, 119],   // rose
  [244, 114, 182],  // pink
  [167, 139, 250],  // violet
  [255, 255, 255],  // white
  [251, 207, 232],  // blush
];

const PARTICLE_COUNT = 100;

function createParticle(canvasW, canvasH, fromScratch = false) {
  const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
  return {
    x:         Math.random() * canvasW,
    y:         fromScratch
                 ? Math.random() * canvasH
                 : canvasH + Math.random() * 80,
    size:      Math.random() * 4.5 + 1.5,           // 1.5 – 6 px
    speedY:    -(Math.random() * 0.6 + 0.2),
    opacity:   Math.random() * 0.45 + 0.35,          // 0.35 – 0.80
    r, g, b,
    offset:    Math.random() * Math.PI * 2,
    amplitude: Math.random() * 0.55 + 0.15,
  };
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let rafId;
    let t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles spread across the canvas on init
    const particles = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height, true)
    );

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Sine-wave horizontal drift
        p.x    += Math.sin(t * 0.008 + p.offset) * p.amplitude;
        p.y    += p.speedY;

        // Recycle when off the top
        if (p.y < -10) {
          Object.assign(p, createParticle(canvas.width, canvas.height, false));
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
      }}
      aria-hidden="true"
    />
  );
}
