import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from "fs";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const packageJson = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);
const globals = {
  ...(packageJson?.dependencies || {}),
};

function resolve(str) {
  return path.resolve(__dirname, str);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  css: {
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
          "react-markdown": "ReactMarkdown",
          "remark-math": "RemarkMath",
          "remark-breaks": "RemarkBreaks",
          "remark-gfm": "RemarkGfm",
          "rehype-katex": "RehypeKatex",
          "rehype-highlight": "RehypeHighlight",
          mermaid: "mermaid",
          "use-debounce": "useDebounce",
          zustand: "zustand",
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
