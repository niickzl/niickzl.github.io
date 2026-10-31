import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const publishedEntry = normalizePath(resolve(projectRoot, 'index.html'));
const sourceEntry = resolve(projectRoot, 'src/index.html');
const publishedAssets = normalizePath(resolve(projectRoot, 'assets'));
const buildDirectory = normalizePath(resolve(projectRoot, 'build'));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'personal-dev-entry',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          const [pathname, query] = (request.url || '').split('?');
          if (pathname === '/personal/' || pathname === '/personal/index.html') {
            request.url = `/personal/src/index.html${query === undefined ? '' : `?${query}`}`;
          }
          next();
        });
      },
      transformIndexHtml: {
        order: 'pre',
        async handler(html, context) {
          if (context.server && normalizePath(context.filename) === publishedEntry) {
            return readFile(sourceEntry, 'utf8');
          }
          return html;
        },
      },
    },
  ],
  base: '/personal/',
  publicDir: false,
  server: {
    open: '/personal/',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: [publishedEntry, `${publishedAssets}/**`, `${buildDirectory}/**`],
    },
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: resolve(projectRoot, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: sourceEntry,
      },
    },
  },
});
