# 项目特性
- 🚀 tsup 极速打包：ESBuild 编译，一键输出 ESM/CJS 双格式 + 自动生成 .d.ts 类型声明；
- 🎨 样式全支持：内置 SCSS/LESS 编译能力，组件可直接导入 .scss/.less 文件，打包自动整合样式；
- 🔄 Vite 热更新：开发阶段毫秒级热更新，修改组件 / 样式实时预览，调试体验拉满；
- 📦 NPM 规范适配：预配置 peerDependencies（避免多 React 实例）、files（仅发布产物）、prepublishOnly（发布前自动构建）；
- 📋 TypeScript 严格模式：React 18+ TS/TSX 语法支持，类型校验全覆盖；
- 🧹 代码规范：集成 ESLint/Prettier，提交前自动校验格式化（可选）；
- 📥 零配置开箱：下载后仅需 pnpm install 即可开发，所有配置已预完成。