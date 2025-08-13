import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    include: "**/*.{jsx,js}",
  })],
  esbuild: {
    loader: 'jsx',
    include: /.*\.(jsx?|tsx?)$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: 'static/js',
    rollupOptions: {
      input: 'assets/js/main.js',
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000
  }
});