import { defineConfig } from 'vite';

export default defineConfig({
  base: '/park-map-maker/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});