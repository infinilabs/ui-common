# @infinilabs/chatmessage

A React component for rendering AI chat messages with support for thinking process, tool calls, and citations.

## Installation

```bash
pnpm install @infinilabs/chatmessage
```

## Usage

```tsx
import { ChatMessage } from '@infinilabs/chatmessage';

// Example message object
const message = {
  _id: '1',
  _source: {
    type: 'assistant', // 'user' or 'assistant'
    message: 'Hello! I am Coco AI.',
    // ... other fields
  }
};

function App() {
  return (
    <ChatMessage 
      message={message} 
      locale="en" // 'en' or 'zh'
      theme="light" // 'light' or 'dark'
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `IChatMessage` | Required | The message object containing content and metadata. |
| `locale` | `'en' \| 'zh'` | `'en'` | Language for UI elements. |
| `theme` | `'light' \| 'dark'` | `'light'` | Color theme. |
| `think` | `object` | `undefined` | Real-time thinking process chunk. |
| `tools` | `object` | `undefined` | Real-time tool call chunk. |
| `query_intent` | `object` | `undefined` | Real-time query intent chunk. |

## Features

- **Markdown Support**: Renders Markdown content including code blocks and tables.
- **Thinking Process**: Collapsible section for AI thought process.
- **Tool Calls**: Displays tool execution steps.
- **Citations**: Supports source citations (if data provided).
- **Theming**: Built-in light and dark modes.
- **I18n**: Built-in English and Chinese support.
