import { defineConfig } from "vite";
import { readFileSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react";
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
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom", ...Object.keys(globals)],
      output: {
        globals: {
          react: "React",
          antd: "antd",
          lodash: "_",
          "@ant-design/icons": "icons",
        },
      },
    },
    outDir: "dist",
    lib: {
      entry: resolve("src/components/index.jsx"),
      name: "DropdownList",
      fileName: "DropdownList",
      formats: ["es", "cjs", "umd", "iife"],
    },
  },
});
