# @infinilabs/chat-message

一个用于渲染 AI 对话消息的 React 组件，支持流式响应、思考过程展示、工具调用、引用来源等完整的 AI 回答结构。

> 组件已内置 Tailwind v4 样式注入和 `react-i18next` 配置，作为 UI 组件使用时只需要按本文档传入数据和 props 即可。

## 安装

```bash
pnpm install @infinilabs/chat-message
```

## 核心类型

`ChatMessage` 要求你传入一个 `IChatMessage`，其中 `_source` 中的字段会被用于驱动 UI。

```ts
export interface ISource {
  id?: string;
  created?: string;
  updated?: string;
  status?: string;
  session_id?: string;
  type?: string;                // 'user' | 'assistant' 等
  message?: any;                // 主消息内容（Markdown 文本）
  attachments?: string[];       // 附件 ID 列表（由业务侧解析为明细）
  title?: string;
  question?: string;            // 用户原始问题
  details?: any[] | null;       // 结构化步骤：query_intent / tools / fetch_source ...
  assistant_id?: string;        // 助手 ID（可用于从列表中查找）
  assistant_item?: any;         // 已经解析好的助手对象
  [key: string]: any;
}

export interface IChatMessage {
  _id?: string;
  _source: ISource;
  [key: string]: any;
}

export interface IChunkData {
  session_id?: string;
  message_id?: string;
  message_type?: string;
  reply_to_message?: string;
  chunk_sequence?: number;
  chunk_type?: string;          // 'query_intent' | 'tools' | 'fetch_source' | 'pick_source' | 'deep_read' | 'think' | 'response'
  message_chunk?: string;       // 流式文本内容
  [key: string]: any;
}
```

常见场景：

- 用户消息：`_source.type = 'user'`，主要使用 `question` / `message` / `attachments`。
- 助手消息：`_source.type = 'assistant'`，使用 `message` 作为最终回答文本，`details`/chunk 作为结构化步骤。

---

## 基本用法（静态数据）

```tsx
import { ChatMessage } from '@infinilabs/chat-message';
import type { IChatMessage } from '@infinilabs/chat-message';

const message: IChatMessage = {
  _id: '1',
  _source: {
    type: 'assistant',
    message: 'Hello! I am Coco AI.',
    details: [
      { type: 'think', description: 'Thinking process...' },
      { type: 'query_intent', payload: { /* ... */ } },
    ],
  },
};

function App() {
  return (
    <ChatMessage
      message={message}
      locale="en"
      theme="light"
    />
  );
}
```

---

## 流式响应（推荐）

通过 `ref` 使用 `ChatMessageRef`，可以向组件推送分片（chunk），用于实时渲染思考过程、工具调用、引用来源和最终回答。

```tsx
import { useRef } from 'react';
import {
  ChatMessage,
  type ChatMessageRef,
  type IChatMessage,
  type IChunkData,
} from '@infinilabs/chat-message';

function App() {
  const chatRef = useRef<ChatMessageRef>(null);

  const message: IChatMessage = {
    _id: 'streaming-msg',
    _source: { type: 'assistant', message: '', details: [] },
  };

  const handleStream = async () => {
    // 开始新一轮回答前，清空内部状态
    chatRef.current?.reset();

    const thinkChunk: IChunkData = {
      chunk_type: 'think',
      message_chunk: 'Thinking...',
    };
    chatRef.current?.addChunk(thinkChunk);

    const responseChunk: IChunkData = {
      chunk_type: 'response',
      message_chunk: 'Hello world!',
    };
    chatRef.current?.addChunk(responseChunk);
  };

  return (
    <ChatMessage
      ref={chatRef}
      message={message}
      isTyping
    />
  );
}
```

---

## 列表渲染 + 流式响应

在对话列表中，通常只对「最后一个正在生成的助手消息」挂 `ref` 和 `isTyping`：

```tsx
import { useRef } from 'react';
import {
  ChatMessage,
  type ChatMessageRef,
  type IChatMessage,
} from '@infinilabs/chat-message';

interface MessagesListProps {
  messages: IChatMessage[];
  isTyping: boolean;
  locale?: string;
  theme?: 'light' | 'dark' | 'system';
}

function MessagesList({ messages, isTyping, locale, theme }: MessagesListProps) {
  const activeMessageRef = useRef<ChatMessageRef>(null);

  return (
    <div>
      {messages.map((msg, index) => {
        const isLast = index === messages.length - 1;
        const isAssistant = msg._source.type === 'assistant';
        const shouldAttachRef = isLast && isAssistant && isTyping;

        return (
          <ChatMessage
            key={msg._id}
            ref={shouldAttachRef ? activeMessageRef : null}
            message={msg}
            locale={locale}
            theme={theme}
            isTyping={shouldAttachRef}
          />
        );
      })}
    </div>
  );
}
```

---

## 组件 Props 说明

实现位置：[components/index.tsx](file:///Users/rain9/infinilabs/ui-common/packages/ChatMessage/src/components/index.tsx)

```ts
export interface ChatMessageProps {
  message: IChatMessage;
  isTyping?: boolean;
  onResend?: (value: string) => void;
  hide_assistant?: boolean;
  rootClassName?: string;
  actionClassName?: string;
  actionIconSize?: number;
  copyButtonId?: string;
  formatUrl?: (data: IChunkData) => string;
  theme?: 'light' | 'dark' | 'system';
  locale?: string;
  query_intent?: IChunkData;
  tools?: IChunkData;
  fetch_source?: IChunkData;
  pick_source?: IChunkData;
  deep_read?: IChunkData;
  think?: IChunkData;
  response?: IChunkData;
  currentAssistant?: any;
  assistantList?: any[];
}
```

### 必填 / 选填一览

| Prop               | 是否必填 | 类型                           | 默认值  | 说明 |
|--------------------|----------|--------------------------------|--------|------|
| `message`          | 必填     | `IChatMessage`                 | -      | 当前这条消息的数据，包含类型、文本、`details` 等。 |
| `isTyping`         | 选填     | `boolean`                      | `false`| 是否处于「正在生成」状态，会显示打字光标等。 |
| `onResend`         | 选填     | `(value: string) => void`      | -      | 重新发送按钮回调，一般传入原问题文本。 |
| `hide_assistant`   | 选填     | `boolean`                      | `false`| 是否隐藏助手头像和名称。 |
| `theme`            | 选填     | `'light' \| 'dark' \| 'system'`| -      | 主题模式；`system` 会根据系统深浅色自动选择。 |
| `locale`           | 选填     | `string`                       | -      | 语言，例如 `'en'`、`'zh'`，改变时内部调用 `i18n.changeLanguage`。 |
| `formatUrl`        | 选填     | `(data: IChunkData) => string` | -      | 用于 `FetchSource` 中自定义文档链接 URL。 |
| `rootClassName`    | 选填     | `string`                       | -      | 外层根元素的额外 class，便于业务方统一调整样式。 |
| `actionClassName`  | 选填     | `string`                       | -      | 底部操作区（复制 / 点赞 / 重试）的外层 class。 |
| `actionIconSize`   | 选填     | `number`                       | -      | 操作区图标尺寸，默认使用内置大小。 |
| `copyButtonId`     | 选填     | `string`                       | -      | 复制按钮的 id，便于埋点或自动化测试。 |
| `query_intent`     | 选填     | `IChunkData`                   | -      | 「理解查询」阶段的流式分片，可不通过 `details` 而直接驱动 UI。 |
| `tools`            | 选填     | `IChunkData`                   | -      | 工具调用阶段分片。 |
| `fetch_source`     | 选填     | `IChunkData`                   | -      | 文档检索阶段分片。 |
| `pick_source`      | 选填     | `IChunkData`                   | -      | 已选来源分片。 |
| `deep_read`        | 选填     | `IChunkData`                   | -      | 深度阅读阶段分片。 |
| `think`            | 选填     | `IChunkData`                   | -      | 思考过程分片。 |
| `response`         | 选填     | `IChunkData`                   | -      | 回答正文分片；如果不使用流式，可以直接写在 `message._source.message`。 |
| `currentAssistant` | 选填     | `any`                          | -      | 当前助手信息（包含名称、图标等），在无 `assistant_item` 时作为兜底。 |
| `assistantList`    | 选填     | `any[]`                        | -      | 所有助手列表，组件会根据 `assistant_id` 自动匹配出当前助手。 |

> 一般业务场景只需要关心：`message`、`isTyping`、`onResend`、`theme`、`locale`。  
> 其余 props 用于更细粒度的流式控制、多助手匹配或接入已有平台数据。

---

## Ref 实例方法

实现位置同样在 [components/index.tsx](file:///Users/rain9/infinilabs/ui-common/packages/ChatMessage/src/components/index.tsx)。

```ts
export interface ChatMessageRef {
  addChunk: (chunk: IChunkData) => void;
  reset: () => void;
}
```

| Method    | 类型                          | 说明 |
|-----------|-------------------------------|------|
| `addChunk`| `(chunk: IChunkData) => void` | 注入一条新的流式分片。根据 `chunk.chunk_type` 自动更新对应 UI 区块并控制加载状态。支持类型：`query_intent`、`tools`、`fetch_source`、`pick_source`、`deep_read`、`think`、`response`。 |
| `reset`   | `() => void`                  | 清空内部所有分片状态，重置加载标记，通常在开始新一轮流式回答前调用。 |

### 流式 chunk 行为说明（简要）

- `query_intent`：驱动顶部「理解查询」卡片，可附带 `suggestion` 字段，内部会把推荐问句传递给 `SuggestionList`。
- `tools`：展示调用工具的步骤和输入输出信息。
- `fetch_source`：展示检索到的文档列表和摘要。
- `pick_source`：展示已选中的引用来源。
- `deep_read`：展示正在阅读的文档进度。
- `think`：展示或折叠的思考过程内容。
- `response`：回答正文，会自动追加到已有内容中；当遇到 `<think>...</think>` 包裹内容时，会将其中内容视为 `think` 分片而不是回答文本。

---

## 功能概览

- 内部状态管理：自动处理 `query_intent`、`tools`、`fetch_source`、`pick_source`、`deep_read`、`think`、`response` 等复杂步骤。
- 流式渲染：支持通过 `addChunk` 实时推送分片，带打字动效。
- Markdown 支持：使用 `@ant-design/x-markdown` 渲染代码块、列表、表格等。
- 思考过程：可折叠的思考内容区域。
- 工具调用可视化：展示工具执行的过程和结果。
- 引用与来源：展示检索文档、选中来源等信息。
- 主题与暗色模式：内置 light / dark / system，组件内部已处理暗色配色。
- 国际化：内置中英文文案，支持通过 `locale` 切换。

---

这样，所有 props（包括内部用到的流式 chunk props）和 ref 方法都覆盖到了，而且跟当前实现是对齐的。  
如果你希望 README 里再加一个「完整数据结构示例」（比如用当前 demo 的 JSON），我也可以再帮你补一节。