import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), ViteMinifyPlugin({})],
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../../output/options'),
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
