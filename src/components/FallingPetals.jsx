import { useEffect, useRef } from 'react';

const DEFAULT_COLORS = [
  [212, 165, 176],  // dusty rose
  [232, 197, 206],  // blush
  [196, 129, 155],  // rose
  [240, 213, 220],  // baby pink
  [255, 250, 248],  // ivory
];

function createPetal(w, h, colors, fromScratch = false) {
  const [r, g, b] = colors[Math.floor(Math.random() * colors.length)];
  return {
    x: Math.random() * w,
    y: fromScratch ? Math.random() * h : -20 - Math.random() * 80,
    size: Math.random() * 6 + 4,
    speedY: Math.random() * 0.55 + 0.25,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.025,
    opacity: Math.random() * 0.5 + 0.35,
    r, g, b,
    offset: Math.random() * Math.PI * 2,
    amplitude: Math.random() * 0.8 + 0.25,
  };
}

export default function FallingPetals({ colors = DEFAULT_COLORS, count = 20 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;
    let t = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const petals = Array.from({ length: count }, () =>
      createPetal(canvas.width, canvas.height, colors, true)
    );

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petals) {
        p.x += Math.sin(t * 0.008 + p.offset) * p.amplitude;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          Object.assign(p, createPetal(canvas.width, canvas.height, colors, false));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.opacity})`);
        grad.addColorStop(1, `rgba(${p.r},${p.g},${p.b},${p.opacity * 0.3})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [colors, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
