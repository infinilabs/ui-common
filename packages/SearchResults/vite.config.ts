import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "SearchResults",
      formats: ["es", "cjs"],
      fileName: "search-results"
    },
    rollupOptions: {
      external: ["react", "react-dom", "clsx", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});

