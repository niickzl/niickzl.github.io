import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: "/LoLDraftAppWeb/",
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
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
