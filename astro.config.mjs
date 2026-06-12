import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mercen.net',
  output: 'static',
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: {
        '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
  },
});
