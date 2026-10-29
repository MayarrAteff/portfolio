import type { Config } from 'tailwindcss';

// Colors are CSS variables (see src/index.css) so light/dark is one class on <html>, with no `dark:` on every element.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        xray: token('xray'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        // Arabic glyphs inside mono text fall back to Plex Arabic, which keeps the letters joined.
        mono: ['"JetBrains Mono Variable"', '"IBM Plex Sans Arabic"', 'ui-monospace', 'monospace'],
      },
    },
  },
} satisfies Config;
