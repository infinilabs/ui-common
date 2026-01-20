# @infinilabs/ai-chat

一个「开箱即用」的 AI Chat 组件库，用于在 React 应用中快速集成带有：

- 会话历史列表（选择、重命名、删除、刷新、搜索）
- 小助手列表（选择、翻页、搜索）
- AI 聊天区域（支持流式回答、思考过程展示、引用来源等）

---

## 安装与构建

- 项目使用 pnpm 进行依赖管理和构建。
- 最终以 npm 包形式对外发布。

```bash
pnpm add @infinilabs/ai-chat
```

### Peer Dependencies

在使用本组件库之前，请确保你的项目中安装了以下依赖（通常这些也是你项目的基础依赖）：

- `react` >= 18.3.1
- `react-dom` >= 18.3.1
- `antd` >= 6

本包默认内置：

- React 组件 + Zustand 状态管理
- Tailwind v4 + 一套内置样式（JS 自动注入，无需手动引入 CSS）
- `react-i18next` 国际化配置（中英文文案）
- 依赖 `antd` 的 `message` 组件做操作反馈
- `axios`, `dayjs`, `lucide-react` 等工具库

开发与构建：

```bash
pnpm dev     # 本地开发预览
pnpm build   # 构建 npm 产物（dist）
pnpm lint    # 代码检查
```

---

## 导出组件一览

1. `Chat`：核心 AI 聊天区域（流式回答、思考过程、引用文档等）。
2. `History`：会话历史列表（选择、重命名、删除、刷新、搜索）。
3. `AssistantList`：小助手选择列表（支持翻页、搜索、限制 ID）。
4. `ChatInput`：独立输入框组件（高级用法，可单独组合 UI）。

通常推荐的组合方式是：左侧 `AssistantList + History`，右侧 `Chat`。

---

## 快速开始示例

一个最小可用的布局示例（假设你已经在后端实现了对应的接口，见后文「后端接口约定」）：

```tsx
import { useRef } from "react";
import {
  Chat,
  History,
  AssistantList,
} from "@infinilabs/ai-chat";

// Chat 组件内部的 ref 方法定义（仅类型示意，见下文详细说明）
interface ChatAIRef {
  init: (params: { message?: string; attachments?: string[] }) => void;
  cancelChat: () => void;
  clearChat: () => void;
}

function AIChatApp() {
  const chatRef = useRef<ChatAIRef | null>(null);

  const BaseUrl = "https://your-api-endpoint.example.com";
  const Token = "your-api-token";

  return (
    <div className="flex h-full">
      <div className="w-72 border-r flex flex-col gap-3 p-3">
        <AssistantList BaseUrl={BaseUrl} Token={Token} />
        <History BaseUrl={BaseUrl} Token={Token} />
      </div>

      <div className="flex-1 flex flex-col p-3">
        <Chat ref={chatRef} BaseUrl={BaseUrl} />
      </div>
    </div>
  );
}
```

要点说明：

- 必须提供后端 HTTP 地址 `BaseUrl`，用于请求 `/chat/*`、`/assistant/*` 等接口。
- 如果后端需要鉴权，可以通过 `Token` 传入 `History`（下文有解释）。
- `Chat` 组件通过 `ref` 暴露方法来发送消息、取消对话等。
- 历史、助手列表和 Chat 使用一个共享的 Zustand store 做状态同步。

---

## Chat 组件

### Props 定义

```ts
interface ChatAIProps {
  BaseUrl: string;
  Token?: string;
  formatUrl?: (data: IChunkData) => string;
  locale?: string;
  t?: TFunction;
}
```

```ts
export interface IChunkData {
  message_chunk?: string;
  [key: string]: unknown;
}
```

### 必填 / 选填一览

| Prop       | 是否必填 | 类型                              | 说明 |
|-----------|----------|-----------------------------------|------|
| `BaseUrl` | 必填     | `string`                          | 后端服务基础地址，例如 `https://api.example.com`。用于文件访问等。网络请求本身通过 localStorage 中的配置读取，见「后端接口约定」。 |
| `Token`   | 选填     | `string`                          | 预留的鉴权 Token。当前版本主要通过 `History` 组件统一写入 localStorage 中的 `headers`，供所有请求复用。 |
| `formatUrl` | 选填   | `(data: IChunkData) => string`    | 用于把引用文档等 chunk 数据转换为链接地址，传递给底层 `@infinilabs/chat-message`。 |
| `locale`  | 选填     | `string`                          | 语言标识（如 `"en"`、`"zh"`）。不传时使用 `react-i18next` 默认语言。 |
| `t`       | 选填     | `TFunction`                       | 自定义翻译函数；不传时使用组件内部的 `useTranslation`。 |

注意：

- `BaseUrl` 目前主要用接口请求，可以知道使用的哪个 coco-server 服务。

### Ref 方法

```ts
export interface SendMessageParams {
  message?: string;
  attachments?: string[];
}

export interface ChatAIRef {
  init: (params: SendMessageParams) => void;
  cancelChat: () => void;
  clearChat: () => void;
  onSelectChat: (chat: Chat) => void;
}
```

方法说明：

| 方法名         | 参数                         | 说明 |
|----------------|------------------------------|------|
| `init`         | `SendMessageParams`          | 发送一条消息：如果当前还没有会话，则创建新会话并调用 `/chat/_create`；如果有正在使用的会话，则调用 `/chat/{chatId}/_chat`。 |
| `cancelChat`   | 无                           | 取消当前正在进行的回答，内部会请求 `/chat/{chatId}/_cancel?message_id={curId}`，并重置流式状态。 |
| `clearChat`    | 无                           | 清空当前激活会话，在有 `_id` 时会调用 `/chat/{chatId}/_close`，然后清空 `activeChat`。 |
| `onSelectChat` | `chat: Chat`                 | 手动选择一个会话作为当前会话。内部会自动拉取该会话的历史记录。 |

`Chat` 内部使用了多个 Hook 来处理流式 chunk、思考过程、工具调用等（`useMessageChunkData`、`useMessageHandler`），并把这些数据传给 `ChatContent` 再由 `@infinilabs/chat-message` 渲染。

---

## History 组件

### Props 定义

```ts
interface HistoryProps {
  BaseUrl: string;
  Token?: string;
  locale?: string;
  t?: TFunction;
}
```

### 功能与行为

- 初始化时根据 `BaseUrl`、`Token` 写入：
  - `localStorage["app-store"] = { state: { endpoint_http: BaseUrl } }`
  - `localStorage["headers"] = { "X-API-TOKEN": Token }`（仅当传入 `Token` 时）
- 使用 `GET /chat/_history` 拉取会话列表并写入 Zustand store：
  - 默认请求参数：`{ from: 0, size: 100, keyword }`
  - 当没有当前激活会话时，会自动选中第一条。
- 渲染内部的 `HistoryList`，支持：
  - 搜索（关键字筛选）
  - 手动刷新
  - 选择会话
  - 重命名会话（`PUT /chat/{chatId}`）
  - 删除会话（`DELETE /chat/{chatId}`）

### 使用示例

```tsx
import { History } from "@infinilabs/ai-chat";

function Sidebar() {
  return (
    <History
      BaseUrl="https://api.example.com"
      Token="your-api-token"
      locale="zh"
    />
  );
}
```

推荐做法：

- 统一通过 `History` 组件初始化 `BaseUrl` 和 `Token`，后续所有 `Get` / `Post` / `streamPost` 请求都会复用这两个配置。

---

## AssistantList 组件

### Props 定义

```ts
interface AssistantListProps {
  BaseUrl: string;
  Token?: string;
  assistantIDs?: string[];
  locale?: string;
  t?: TFunction;
}
```

注意：当前实现中，`BaseUrl`、`Token` 同样依赖 `axiosRequest.ts` 中从 localStorage 读取的配置，因此实际生效的仍然是 `History` 写入的值；在布局中同时使用 `History` 和 `AssistantList` 即可。

### 功能与行为

- 使用 `POST /assistant/_search` 获取小助手列表，支持：
  - 分页：`current`（页码）、`pageSize`（每页数量，默认 10）
  - 搜索：`keyword`
  - 过滤：`ids`（通过 `assistantIDs` 传入一组助手 ID）
- 将获取到的助手列表写入 Zustand store。
- 当列表不为空且当前没有已选助手时，自动选择第一条。
- 支持滚动加载更多（触底 + `hasMore` 控制）。
- UI 方面：
  - 顶部按钮显示当前助手 name 与 icon。
  - 点击后浮层中展示搜索输入框 + 列表，可切换助手。

### 使用示例

```tsx
import { AssistantList } from "@infinilabs/ai-chat";

function AssistantSelector() {
  return (
    <AssistantList
      BaseUrl="https://api.example.com"
      Token="your-api-token"
      assistantIDs={["assistant-1", "assistant-2"]}
      locale="zh"
    />
  );
}
```

`Chat` 组件在创建新会话时，会从 store 中读取当前助手的 `_id`，并作为 `assistant_id` 写入 `/chat/_create` 请求体。

---

## ChatInput 组件（可选）

该组件内部已被 `Chat` 使用，一般不需要单独使用。如果你希望自定义布局、只复用输入框，可以单独引入：

```ts
interface ChatInputProps {
  onSend: (params: SendMessageParams) => void;
  disabled: boolean;
  isChatMode: boolean;
  inputValue: string;
  changeInput: (val: string) => void;
  isDeepThinkActive: boolean;
  setIsDeepThinkActive: () => void;
  chatPlaceholder?: string;
  searchPlaceholder?: string;
  returnToInputShortcut?: string; // 默认 "i"
}
```

特性：

- 自动高度 textarea。
- 支持 Enter 发送、Shift+Enter 换行。
- 支持「按 i 聚焦输入框」的快捷键提示。
- 底部附加一些模式切换、深度思考开关等控制按钮。

---

## 类型定义汇总

```ts
export interface ChatMessageSource {
  type: string;
  assistant_id?: string;
  message: string;
  question?: string;
  [key: string]: unknown;
}

export interface ChatMessageItem {
  _id: string;
  _source: ChatMessageSource;
}

export interface Chat {
  _id: string;
  messages?: ChatMessageItem[];
  _source?: {
    id?: string;
    [key: string]: unknown;
  };
}
```

你可以在自己的代码中根据需要复制这些接口，用于约束后端返回的数据结构。

---

## 小结与推荐接入方式

1. 在应用中引入 `AssistantList`、`History`、`Chat` 三个组件，组成完整的 AI Chat 页面。
2. 使用 `History` 组件统一配置 `BaseUrl`、`Token`，确保所有请求都能访问到后端。
3. 如需手动发送消息或控制对话流程，可以通过 `Chat` 的 `ref` 调用 `init`、`cancelChat`、`clearChat` 等方法。
4. 如需深度定制 UI，仅复用其中部分组件（例如只用 `Chat` 或 `ChatInput`），也完全支持。


