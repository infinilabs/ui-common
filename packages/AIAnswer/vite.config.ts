import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ rollupTypes: true, tsconfigPath: "./tsconfig.app.json" }), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AIAnswer",
      formats: ["es", "cjs"],
      fileName: "ai-answer"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@ant-design/x-markdown",
        "lucide-react"
      ],
      output: {
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
