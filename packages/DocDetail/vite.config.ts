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
    cssInjectedByJsPlugin(),
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
        "@ant-design/cssinjs",
        "@ant-design/x",
        "@ant-design/x-markdown",
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
