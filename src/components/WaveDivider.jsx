// Cada variante tiene una onda distinta — ninguna es espejo de otra
const WAVES = {
  a: "M0,20 C200,75 500,0 800,55 C1100,85 1300,15 1440,45 L1440,80 L0,80 Z",
  b: "M0,60 C150,10 450,80 750,30 C1000,0 1250,65 1440,20 L1440,80 L0,80 Z",
  c: "M0,10 C350,80 600,5 900,60 C1100,95 1300,25 1440,50 L1440,80 L0,80 Z",
  d: "M0,45 C100,5 400,75 700,20 C950,0 1200,70 1440,35 L1440,80 L0,80 Z",
};

let _counter = 0;

export function WaveDivider({ from, to, variant, height = 80 }) {
  // Rotar variantes automáticamente si no se especifica
  const key = variant || (['a','b','c','d'][_counter++ % 4]);
  const path = WAVES[key];

  return (
    <div style={{ background: to, lineHeight: 0, display: 'block' }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          width: '100%',
          height,
          background: from,
        }}
        preserveAspectRatio="none"
      >
        <path d={path} fill={to} />
      </svg>
    </div>
  );
}
