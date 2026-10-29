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
        'surface-2': token('surface-2'),
        fg: token('fg'),
        muted: token('muted'),
        // Borders are the text color at low alpha (`border-line/10`), so they suit both themes.
        line: token('fg'),
        accent: token('accent'),
      },
      fontFamily: {
        sans: ['"Geist Variable"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        // Bricolage has no Arabic, so Arabic headings fall through to Plex Sans Arabic in its bold weight.
        display: ['"Bricolage Grotesque Variable"', '"IBM Plex Sans Arabic"', '"Geist Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', '"IBM Plex Sans Arabic"', 'ui-monospace', 'monospace'],
      },
    },
  },
} satisfies Config;
