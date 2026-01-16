# @infinilabs/ai-answer

一个用于展示 AI 回答的 React 组件。基于 `@ant-design/x-markdown` 构建，支持 Markdown 渲染、长文本自动折叠、流式输出展示、深色模式以及底部操作栏。

## 特性

- 📝 **Markdown 渲染**：支持丰富的 Markdown 格式渲染。
- ↕️ **自动折叠**：内容超过 280 字自动显示“展开/收起”按钮，支持自定义折叠高度。
- 🌊 **流式支持**：完美支持流式文本输入，生成过程中保持展开，生成后可手动收起。
- 🌓 **主题适配**：内置 Light/Dark 主题支持，也可跟随系统自动切换。
- 🛠 **操作栏**：内置复制、点赞、点踩、朗读（TTS）等常用操作。
- 🌍 **国际化**：支持自定义界面文案（展开、收起、继续追问等）。

## 安装

```bash
npm install @infinilabs/ai-answer
# 或者
pnpm add @infinilabs/ai-answer
```

## 快速开始

```tsx
import { AIAnswer } from '@infinilabs/ai-answer';
import '@infinilabs/ai-answer/dist/style.css'; // 引入样式（如果需要）

function App() {
  return (
    <AIAnswer
      title="智能解读"
      content="这是一个 AI 生成的回答内容..."
      onContinue={() => console.log('点击了继续追问')}
    />
  );
}
```

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `content` | `string` | - | **(必填)** Markdown 文本内容，支持流式更新 |
| `title` | `string` | `"智能解读"` | 标题文本 |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | 主题模式 |
| `maxHeight` | `number` | `180` | 折叠后的最大高度 (px) |
| `expandText` | `string` | `"展开更多"` | 展开按钮文本 |
| `collapseText` | `string` | `"收起"` | 收起按钮文本 |
| `continueLabel` | `string` | `"继续追问"` | 继续追问按钮文本 |
| `onContinue` | `() => void` | - | 点击“继续追问”的回调 |

### 关于流式数据 (Streaming)

组件内部对流式数据进行了优化。当 `content` 属性动态增长时（例如正在接收 AI 流式响应）：
1. 组件会保持当前的展开/收起状态。
2. 初始加载时如果内容较短，组件默认展开。
3. 随着内容增长超过 280 字，底部会出现“收起”按钮，但**不会自动折叠**，以确保用户能完整看到正在生成的内容。
4. 用户可以随时点击“收起”来折叠内容。

### 国际化 (i18n)

你可以通过 props 自定义所有界面文本，从而实现国际化：

```tsx
<AIAnswer
  content="..."
  expandText="Read More"
  collapseText="Show Less"
  continueLabel="Ask Follow-up"
  title="AI Analysis"
/>
```

## 开发

本项目使用 pnpm 管理依赖。

```bash
# 安装依赖
pnpm install

# 启动演示项目
pnpm --filter react-ts dev
```

## License

MIT
