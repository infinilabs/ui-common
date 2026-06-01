import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
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
    cssInjectedByJsPlugin({
      injectCodeFunction: function (cssCode, options) {
        try {
          const doc = (globalThis as { document?: any }).document;
          if (doc) {
            var style = doc.createElement('style');

            for (var attribute in options.attributes) {
              style.setAttribute(attribute, options.attributes[attribute]);
            }

            var host = doc.querySelector('[data-fullscreen-host]');
            var shadowRoot = host && host.shadowRoot;

            if (shadowRoot) {
              // In Shadow DOM, @property with inherits:false doesn't work
              // and @supports fallback targets Safari/Firefox only.
              // Strip the @supports condition to make variable definitions unconditional.
              var processed = cssCode.replace(
                /@layer properties\{@supports[^{]*\{([\s\S]*?)\}\s*\}/g,
                '@layer properties{$1}'
              );
              style.appendChild(doc.createTextNode(processed));
              shadowRoot.appendChild(style);
            } else {
              style.appendChild(doc.createTextNode(cssCode));
              doc.head.appendChild(style);
            }
          }
        } catch {
        }
      }
    }),
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
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // javascriptEnabled: true,
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
