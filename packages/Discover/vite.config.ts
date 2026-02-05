import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import UnoCSS from '@unocss/vite'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts({
      insertTypesEntry: true,
    }),
    UnoCSS({
      inspector: false
    }), 
    cssInjectedByJsPlugin()
  ],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**']
    },
    open: false,
    proxy: {
      // 配置接口代理规则：匹配以 /api 开头的请求（自定义前缀，避免和前端路由冲突）
      '/api': {
        target: 'https://localhost:19200', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''), 
        secure: false 
      }
    }
  },
  resolve: {
    // 路径别名，方便源码引入
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, 
        silenceDeprecations: ['import', 'legacy-js-api', 'color-functions'],
      }
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/components/index.tsx'),
      name: "Discover",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "antd",
        "@ant-design/icons",
        /^@elastic\/eui(\/.*)?$/, 
        /^@ant-design\/icons(\/.*)?$/,
        "dayjs"
      ]
    }
  },
});