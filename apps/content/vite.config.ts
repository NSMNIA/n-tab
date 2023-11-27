import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['iife'],
      fileName: () => 'index.js',
    },
    outDir: '../../output/content_script',
  },
});
