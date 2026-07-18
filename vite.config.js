import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import fs from 'node:fs';

// Serve clean URLs locally (e.g. /about -> about.html) so `npm run dev` and
// `npm run preview` match Vercel's cleanUrls behaviour in production.
function cleanUrlsDev() {
  const rewrite = (req, res, next) => {
    const q = req.url.indexOf('?');
    const path = q === -1 ? req.url : req.url.slice(0, q);
    if (path !== '/' && !path.includes('.') && !path.startsWith('/@') && !path.startsWith('/src/') && !path.startsWith('/node_modules/')) {
      const rel = path.replace(/^\/+/, '').replace(/\/+$/, '');
      if (rel && fs.existsSync(resolve(__dirname, rel + '.html'))) {
        req.url = '/' + rel + '.html' + (q === -1 ? '' : req.url.slice(q));
      }
    }
    next();
  };
  return {
    name: 'clean-urls-dev',
    configureServer(server) { server.middlewares.use(rewrite); },
    configurePreviewServer(server) { server.middlewares.use(rewrite); },
  };
}

// Multi-page static site. Each HTML file is its own entry; Vite pre-compiles the
// JSX, bundles React from npm, and minifies for production. `public/` holds the
// design-system bundle, fonts CSS and every image, served from the site root.
export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' }), cleanUrlsDev()],
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
