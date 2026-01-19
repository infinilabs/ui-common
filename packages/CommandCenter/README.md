# Infinilabs Command Center

基于 Vite + React + Tailwind 的「搜索 / Chat AI 中心浮层」，对应 `start.md` 的 3 级升级方案实现：

- 浮层毛玻璃背景 + 渐变边框卡片
- Tab 结构：Search / Chat AI / History
- 统一输入条（命令/搜索/AI 自动识别）
- 快捷指令（Prompt Actions）
- 搜索结果轻预览（前 5 条 + 查看全部）
- AI 面板基础对话与推荐下一步示例
- ⌘+K / Ctrl+K 快捷键唤起

## 开发

```bash
pnpm install
pnpm --filter @infinilabs/command-center dev
```

## 构建

```bash
pnpm --filter @infinilabs/command-center build
pnpm --filter @infinilabs/command-center preview
```

## 目录

```
packages/CommandCenter
├── src/
│   ├── components/
│   │   ├── CommandCenter.tsx
│   │   ├── Tabs.tsx
│   │   ├── InputBar.tsx
│   │   ├── QuickActions.tsx
│   │   ├── SearchPreview.tsx
│   │   ├── ChatAI.tsx
│   │   └── History.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── package.json
```

## 后续增强建议

- 接入真实搜索/AI 后端接口
- 引入 `framer-motion` 更丰富动效（已安装，可用于卡片/结果浮动/过渡）
- 引入国际化与主题色自定义（可复用 SearchChatUI 的 Provider）
- 提供组件级封装以嵌入现有产品页面

