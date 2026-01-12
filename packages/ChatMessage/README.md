# @infinilabs/chat-message

A React component for rendering AI chat messages with support for streaming responses, thinking process, tool calls, and citations.

## Installation

```bash
pnpm install @infinilabs/chat-message
```

## Usage

### Basic Rendering (Static Data)

```tsx
import { ChatMessage } from '@infinilabs/chat-message';

const message = {
  _id: '1',
  _source: {
    type: 'assistant',
    message: 'Hello! I am Coco AI.',
    // Pre-populated details for history
    details: [
       { type: 'think', description: 'Thinking process...' },
       { type: 'query_intent', payload: { ... } }
    ]
  }
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

### Streaming Responses (Real-time)

To stream AI responses (including thinking, tools, etc.), use the `ref` to push chunks directly to the component. This allows the component to manage internal loading states and data accumulation efficiently.

```tsx
import { useRef } from 'react';
import { ChatMessage, ChatMessageRef, IChatMessage } from '@infinilabs/chat-message';

function App() {
  const chatRef = useRef<ChatMessageRef>(null);
  
  const message: IChatMessage = {
    _id: 'streaming-msg',
    _source: { type: 'assistant', message: '', details: [] }
  };

  const handleStream = async () => {
    chatRef.current?.reset();
    chatRef.current?.addChunk({ chunk_type: 'think', message_chunk: '...' });
    chatRef.current?.addChunk({ chunk_type: 'response', message_chunk: 'Hello world!' });
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

### List Rendering with Streaming (Recommended)

When rendering a list of messages, attach the `ref` only to the last assistant message while streaming, and pass `isTyping` to that active message.

```tsx
import { useRef } from 'react';
import { ChatMessage, ChatMessageRef } from '@infinilabs/chat-message';

function MessagesList({ messages, isTyping, locale, theme }) {
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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `IChatMessage` | Required | The message object containing content and metadata. |
| `isTyping` | `boolean` | `false` | Shows typing cursor/animation. |
| `onResend` | `(value: string) => void` | - | Callback for resending a message (user messages). |
| `hide_assistant` | `boolean` | `false` | Whether to hide the assistant avatar/name. |
| `theme` | `'light' \| 'dark' \| 'system'` | - | Color theme. |
| `locale` | `string` | - | Language code (e.g., 'en', 'zh'). |
| `formatUrl` | `(data: IChunkData) => string` | - | Custom formatter for source URLs. |
| `rootClassName` | `string` | - | Custom class for the root element. |
| `actionClassName` | `string` | - | Custom class for the action buttons area. |
| `actionIconSize` | `number` | - | Size of the action icons. |
| `copyButtonId` | `string` | - | ID for the copy button (for tracking/testing). |

## Instance Methods (Ref)

| Method | Type | Description |
|--------|------|-------------|
| `addChunk` | `(chunk: IChunkData) => void` | Feeds a new data chunk (think, tools, response, etc.) to the component. Automatically handles loading states and data merging. |
| `reset` | `() => void` | Clears internal streaming state and resets loading indicators. |

## Features

- **Internal State Management**: Automatically handles complex AI steps like `query_intent`, `tools`, `fetch_source`, `pick_source`, `deep_read`, and `think` via streaming chunks.
- **Streaming Support**: Real-time rendering of content as it arrives using `addChunk`.
- **Markdown Support**: Integrated with `@ant-design/x-markdown` for rich text rendering including code blocks and tables.
- **Thinking Process**: Collapsible section for AI thought process.
- **Tool Calls**: Visualizes tool execution steps.
- **Citations**: Supports source citations.
- **Theming**: Built-in light, dark, and system modes.
- **I18n**: Built-in English and Chinese support.
