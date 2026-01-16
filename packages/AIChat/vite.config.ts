import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET || "http://localhost:8000";

  return {
    plugins: [react(), tailwindcss()],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/components/index.tsx"),
        name: "AIChat",
        fileName: "index",
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom", "@infinilabs/chat-message"],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        react: path.resolve(
          __dirname,
          "../ChatMessage/node_modules/react"
        ),
        "react-dom": path.resolve(
          __dirname,
          "../ChatMessage/node_modules/react-dom"
        ),
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
