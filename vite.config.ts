import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { buildStats } from './build-stats';

export default defineConfig({
  plugins: [react(), buildStats()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3005,
  },
});
