import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/components/index.tsx",
      name: "EntityUI",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "antd", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});