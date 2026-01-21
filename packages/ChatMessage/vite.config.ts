import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packageJson = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);
const globals = {
  ...(packageJson?.dependencies || {}),
  ...(packageJson?.peerDependencies || {}),
};

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve("tsconfig.app.json"),
    }) as any
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        "react", 
        "react-dom", 
        "react-i18next",
        ...Object.keys(globals)
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-i18next": "ReactI18next",
          clsx: "clsx",
          "lucide-react": "LucideReact",
          i18next: "i18n",
          "@ant-design/x-markdown": "xMarkdown",
          ahooks: "ahooks",
          "@infinilabs/attachments": "attachments",
          "@infinilabs/markdown": "Markdown",
          antd: "antd",
          "@infinilabs/search-results": "SearchResults",
        },
      },
    },
    outDir: "dist",
    lib: {
      entry: resolve("src/components/index.tsx"),
      name: "ChatMessage",
      fileName: "ChatMessage",
      formats: ["es", "cjs", "umd", "iife"],
    },
  },
})
