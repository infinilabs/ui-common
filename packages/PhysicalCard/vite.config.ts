import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      outDir: 'dist',
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: 'src/components/index.tsx',
      name: 'PhysicalCard',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) =>
        format === 'es'
          ? 'PhysicalCard.js'
          : format === 'cjs'
          ? 'PhysicalCard.cjs'
          : 'PhysicalCard.umd.js'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});