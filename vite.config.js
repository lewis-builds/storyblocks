import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page static site. Each HTML file is its own entry; Vite pre-compiles the
// JSX, bundles React from npm, and minifies for production. `public/` holds the
// design-system bundle, fonts CSS and every image, served from the site root.
export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        schools: resolve(__dirname, 'schools.html'),
        resources: resolve(__dirname, 'resources.html'),
        thanks: resolve(__dirname, 'thanks.html'),
        about: resolve(__dirname, 'about.html'),
        delivery: resolve(__dirname, 'delivery.html'),
        contact: resolve(__dirname, 'contact.html'),
        faqs: resolve(__dirname, 'faqs.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        gift: resolve(__dirname, 'gift.html'),
        wholesale: resolve(__dirname, 'wholesale.html'),
        why: resolve(__dirname, 'why.html'),
        parents: resolve(__dirname, 'parents.html'),
      },
    },
  },
});
