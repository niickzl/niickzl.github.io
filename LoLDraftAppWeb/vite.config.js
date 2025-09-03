import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Check if we're building for GitHub Pages
const isGitHubPages = process.env.NODE_ENV === 'production';

// Base URL for GitHub Pages
const base = isGitHubPages ? '/LoLDraftAppWeb/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 3000,
    open: true
  }
});
