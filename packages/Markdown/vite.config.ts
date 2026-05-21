import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import dts from "vite-plugin-dts";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
      insertTypesEntry: true,
    }),
    cssInjectedByJs(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/components/index.tsx"),
      name: "InfinilabsMarkdown",
      fileName: "markdown",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "antd",
        "@ant-design/cssinjs",
        "@ant-design/x",
        "@ant-design/x-markdown",
        "clsx",
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          antd: "antd",
          "@ant-design/cssinjs": "AntDesignCssinjs",
          "@ant-design/x": "AntDesignX",
          "@ant-design/x-markdown": "AntDesignXMarkdown",
          clsx: "clsx",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
});
