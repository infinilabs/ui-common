# @infinilabs/markdown

A powerful and flexible Markdown component for React applications, built on top of `@ant-design/x-markdown`. It supports rendering markdown content from strings or URLs, with syntax highlighting, tables, and customizable components.

## Installation

```bash
npm install @infinilabs/markdown antd react react-dom
# or
pnpm add @infinilabs/markdown antd react react-dom
# or
yarn add @infinilabs/markdown antd react react-dom
```

## Usage

### Basic Usage

Render markdown content directly:

```tsx
import Markdown from '@infinilabs/markdown';

const markdownContent = `
# Hello World

This is a markdown component.

- Item 1
- Item 2
`;

function App() {
  return (
    <Markdown content={markdownContent} />
  );
}
```

### Fetch from URL

Fetch and render markdown from a URL:

```tsx
import Markdown from '@infinilabs/markdown';

function App() {
  return (
    <Markdown url="https://raw.githubusercontent.com/infinilabs/ui-common/main/README.md" />
  );
}
```

### With Custom Styles

```tsx
import Markdown from '@infinilabs/markdown';

function App() {
  return (
    <Markdown 
      content="# Styled Content" 
      className="custom-markdown-class"
      style={{ padding: 20 }}
    />
  );
}
```

## API Reference

### Markdown

The `Markdown` component accepts all props from `XMarkdownProps` (from `@ant-design/x-markdown`) plus the following additional props:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `string` | - | The markdown content string to render. |
| `url` | `string` | - | The URL to fetch markdown content from. If provided, it overrides `content` after fetching. |
| `className` | `string` | - | Custom CSS class name. |
| `style` | `CSSProperties` | - | Custom inline styles. |
| `components` | `Components` | - | Map of custom components to override default markdown elements (e.g., `code`, `a`, `table`). |

### Supported Syntax

- Headers (H1-H6)
- Lists (Ordered and Unordered)
- Links
- Images
- Tables
- Code Blocks (with syntax highlighting)
- Blockquotes
- Inline Code
- Emphasis (Bold, Italic)

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## License

MIT
