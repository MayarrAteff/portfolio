import { type CSSProperties, useEffect, useRef } from 'react';

// Seeded (mulberry32), so the sky looks the same on every visit and every redraw. A plain multiplicative
// generator gives near-identical first values for small seeds, which lined the twinkles up along one edge.
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

// Mostly white, with a few stars tinted toward the site's blue and violet.
const tints = ['255 255 255', '255 255 255', '255 255 255', '255 255 255', '191 219 254', '221 214 254'];

/** About 200 stars per megapixel: enough to read as a sky, sparse enough to stay behind the content. */
function draw(canvas: HTMLCanvasElement) {
  const width = window.innerWidth;
  // The screen height rather than the window's, so the sky doesn't stretch when a phone's address bar hides.
  const height = Math.max(window.innerHeight, window.screen.height);
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext('2d');
  if (!context) return;
  context.scale(scale, scale);

  const random = seeded(2024);
  const count = Math.round(((width * height) / 1_000_000) * 200);
  for (let index = 0; index < count; index += 1) {
    const bright = random() > 0.93;
    const radius = bright ? 0.8 + random() * 0.6 : 0.3 + random() * 0.5;
    const alpha = bright ? 0.6 + random() * 0.3 : 0.15 + random() * 0.4;
    context.fillStyle = `rgb(${tints[Math.floor(random() * tints.length)]} / ${alpha})`;
    context.beginPath();
    context.arc(random() * width, random() * height, radius, 0, Math.PI * 2);
    context.fill();
  }
}

// A handful of stars that slowly twinkle, each on its own rhythm.
const twinkleRandom = seeded(7);
const twinkles = Array.from({ length: 12 }, () => ({
  left: twinkleRandom() * 100,
  top: twinkleRandom() * 100,
  delay: twinkleRandom() * 6,
  duration: 3 + twinkleRandom() * 4,
}));

/**
 * A faint sky behind the dark theme (hidden in light mode by CSS, so it needs no theme state). The canvas is
 * drawn once and redrawn only when the width changes; the page's cards are opaque, so it only shows between them.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let frame = 0;
    let drawnWidth = 0;
    const render = () => {
      if (window.innerWidth === drawnWidth) return;
      drawnWidth = window.innerWidth;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => draw(canvas));
    };
    render();
    window.addEventListener('resize', render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', render);
    };
  }, []);

  return (
    <div aria-hidden="true" className="starfield pointer-events-none fixed inset-x-0 top-0 -z-10 h-lvh overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-x-0 top-0 w-full" />
      {twinkles.map((star) => (
        <span
          key={`${star.left}-${star.top}`}
          className="twinkle absolute h-[3px] w-[3px] rounded-full bg-white"
          style={
            {
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
