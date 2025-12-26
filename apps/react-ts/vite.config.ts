import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import filterUnoConfig from '../../packages/Filter/uno.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      ...(filterUnoConfig as unknown as Record<string, unknown>),
      content: {
        pipeline: {
          include: [
            /apps\/react-ts\/src\/.*\.[jt]sx?$/,
            /packages\/Filter\/(src|dist)\/.*\.[jt]sx?$/,
          ],
        },
      },
    }),
  ],
})
