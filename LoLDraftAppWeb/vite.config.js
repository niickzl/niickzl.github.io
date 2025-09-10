import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    base: isProduction ? '/LolDraftAppWebDist/' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.jsx', '.json']
    },
    build: {
      outDir: '../LolDraftAppWebDist',
      assetsDir: 'assets',
      copyPublicDir: true,
      emptyOutDir: true,
      assetsInlineLimit: 0, // Ensure all assets are copied as files
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        output: {
          assetFileNames: (assetInfo) => {
            // Keep the original file structure for text files
            if (assetInfo.name && assetInfo.name.endsWith('.txt')) {
              return '[name][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },
    publicDir: 'public',
    server: {
      port: 3000
    }
  };
});
