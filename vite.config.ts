import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

/**
 * Preloads the fonts the hero paints with. Without it the browser only finds them after the JavaScript has run
 * and rendered the page, so they download in a second round trip instead of alongside the script.
 */
function preloadHeroFonts(): Plugin {
  const heroFonts = [/^assets\/geist-latin-wght-normal-/, /^assets\/bricolage-grotesque-latin-wght-normal-/];
  return {
    name: 'preload-hero-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (_, { bundle }) =>
        Object.keys(bundle ?? {})
          .filter((file) => file.endsWith('.woff2') && heroFonts.some((font) => font.test(file)))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
            injectTo: 'head',
          })),
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadHeroFonts()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3005,
  },
});
