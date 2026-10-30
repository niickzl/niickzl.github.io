import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectRoot = dirname(fileURLToPath(import.meta.url));

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
    },
  ],
  base: '/personal/',
  publicDir: false,
  server: {
    open: '/personal/',
  },
  build: {
    outDir: resolve(projectRoot, 'build'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(projectRoot, 'src/index.html'),
      },
    },
  },
});
