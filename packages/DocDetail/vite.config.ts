import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    UnoCSS(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
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
  ],
  build: {
    lib: {
      entry: "src/components/index.tsx",
      name: "DocDetail",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "antd",
        "lucide-react",
      ],
      output: {
        inlineDynamicImports: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  server: {
    proxy: {
      "/document": {
        target: "https://dev.infini.cloud:27200",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
