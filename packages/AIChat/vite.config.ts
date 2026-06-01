import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET || "http://localhost:8000";

  return {
    plugins: [react(), tailwindcss(), cssInjectedByJsPlugin({
      injectCodeFunction: function (cssCode, options) {
        try {
          const doc = (globalThis as { document?: any }).document;
          if (doc) {
            var style = doc.createElement('style');

            for (var attribute in options.attributes) {
              style.setAttribute(attribute, options.attributes[attribute]);
            }

            style.appendChild(doc.createTextNode(cssCode));
            var host = doc.querySelector('[data-fullscreen-host]');
            var shadowRoot = host && host.shadowRoot;

            if (shadowRoot) {
              shadowRoot.appendChild(style);
            } else {
              doc.head.appendChild(style);
            }
          }
        } catch {
        }
      }
    })],
    build: {
      // Target ES2018 so that newer syntax such as optional catch binding
      // (`} catch {`, ES2019) gets transpiled. This keeps the published bundle
      // consumable by downstream bundlers whose parser does not understand
      // the more recent syntax forms.
      target: "es2018",
      minify: false,
      lib: {
        entry: path.resolve(__dirname, "src/components/index.tsx"),
        name: "AIChat",
        fileName: "index",
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "antd"
        ],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/chat": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        "/files": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
