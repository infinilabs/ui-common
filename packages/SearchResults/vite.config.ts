import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "SearchResults",
      formats: ["es", "cjs"],
      fileName: "search-results"
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "clsx",
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
