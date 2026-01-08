import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  plugins: [
    react(),
    UnoCSS({
      content: {
        pipeline: {
          include: [
            /apps\/react-ts\/src\/.*\.[jt]sx?$/,
            /packages\/SearchResults\/(src|dist)\/.*\.[jt]sx?$/,
            /packages\/AIAnswer\/(src|dist)\/.*\.[jt]sx?$/,
          ],
        },
      },
    }),
  ],
})
