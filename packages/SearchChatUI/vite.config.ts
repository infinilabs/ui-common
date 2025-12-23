import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 生成类型声明，便于外部 TypeScript 使用
    dts({
      entryRoot: path.resolve(__dirname, './src/components'),
      outDir: path.resolve(__dirname, './dist'),
      tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/components/index.ts'),
      name: 'SearchChatUI',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 保持 React 外部依赖，避免重复打包
      external: ['react', 'react-dom'],
    },
  },
})
