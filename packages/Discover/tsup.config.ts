import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import { lessLoader } from 'esbuild-plugin-less';

export default defineConfig({
  // 基础打包配置（保持不变）
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  external: [
    'react', 
    'react-dom',
  ],
  clean: true,
  outDir: 'dist',
  minify: true,
  sourcemap: false,
  cjsInterop: true,
  esbuildPlugins: [
    sassPlugin({
      quietDeps: true,
      style: 'compressed',
      sourceMap: false,
    }),
    lessLoader(),
  ],
});