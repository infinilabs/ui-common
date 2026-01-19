# @infinilabs/search-chat-ui

基于 React 的可复用搜索输入与选项组件集合。该包以 `src/components/index.ts` 为打包入口，仅导出对外可用的组件与 Provider，并提供最小污染的样式产物，方便在任意基座项目中直接使用。

## 安装

```bash
pnpm add @infinilabs/search-chat-ui
```

> 注意：请在宿主项目中确保已安装并配置 React 18+。本包同时提供 ESM 与 CJS 构建，以及类型声明。

## 入口与导出

从包入口导出的内容：
- 组件：`InputWithOptions`、`CustomInput`、`ModeOptionsBar`
- Provider：`ThemeProvider`、`I18nProvider`、`SearchChatProviders`
- 类型：`InputWithOptionsProps`、`Mode`、`ScopeItem`、`LeftDataItem`

样式产物：
- 组件样式：`dist/search-chat-ui.css`（只包含组件需要的工具与动画，尽量不影响宿主的全局样式）
- 主题样式：`dist/default.css`、`dist/blue.css` 等多个主题色（由 `ThemeProvider` 按需注入，不会默认污染宿主）

## 快速开始

```tsx
import '@infinilabs/search-chat-ui/dist/search-chat-ui.css'
import { SearchChatProviders, InputWithOptions } from '@infinilabs/search-chat-ui'

export default function Demo() {
  return (
    <SearchChatProviders themeMode="dark" themeColor="blue" locale="zh-CN">
      <InputWithOptions
        placeholder="请输入内容…"
        onSend={(payload) => {
          // payload: { text: string; images: File[] }
          console.log('发送', payload)
        }}
        mode="search"
        leftData={[
          { type: 'chip', id: 'deepThink', label: '深度思考', iconName: 'sparkles', selected: false },
          { type: 'chip', id: 'search', label: '搜索', iconName: 'search', selected: true },
          { type: 'dropdown', id: 'mcp', label: 'MCP', iconName: 'bot', selected: false },
        ]}
        scopes={[
          { id: 'all', name: '全部范围', enabled: true },
          { id: 'gitlab', name: 'Gitlab CI Webhook', enabled: true },
          { id: 'server', name: 'Coco Server 文档', enabled: true },
          { id: 'app', name: 'Coco App 文档', enabled: true },
          { id: 'hn', name: 'Hacker News', enabled: false },
        ]}
        onUserAction={(e) => console.log('用户事件', e)}
      />
    </SearchChatProviders>
  )
}
```

## Provider 说明

你可以使用内置 Provider 控制主题模式、主题颜色与国际化：

- `SearchChatProviders`（推荐）
  - `themeMode`: `"light" | "dark" | "system"`，默认 `"system"`
  - `themeColor`: `"default" | "blue" | "green" | "orange" | "red" | "rose" | "violet" | "yellow"`，默认 `"default"`
  - `locale`: `"zh-CN" | "en"`，默认 `"zh-CN"`

- 单独使用：
  - 主题：`ThemeProvider`，支持 `defaultTheme` 与 `defaultColorTheme` 传参；内部会按需动态注入对应主题色 CSS（`dist/*.css`），不会全局污染。
  - 国际化：`I18nProvider`，支持 `locale` 传参；内部使用 `useI18n()` 在组件内取词。

## 组件 API

### InputWithOptions
- `placeholder?: string`
- `onSend?: (payload: { text: string; images: File[] }) => void` 输入发送回调
- `mode?: Mode`，`onModeChange?: (next: Mode) => void`
- `leftData?: LeftDataItem[]`，`onLeftItemToggle?: (id: string, selected: boolean) => void`
- `scopes?: ScopeItem[]`，`onToggleScope?: (id: string, enabled: boolean) => void`
- 搜索与加载：
  - `scopesQuery?: string`，`onScopesQueryChange?: (q: string) => void`
  - `scopesHasMore?: boolean`，`onLoadMoreScopes?: () => void`（滚动加载优先）
  - `scopesPagination?: { page: number; pageSize: number; total: number; onPageChange: (p: number) => void }`
- `onUserAction?: (event) => void` 统一事件上报（包含左侧项、scope、模式等变更）

### CustomInput
- `placeholder?: string`
- `className?: string`
- `onSend?: (payload: { text: string; images: File[] }) => void`

### ModeOptionsBar
- `mode: Mode`，`onModeChange: (next: Mode) => void`
- `scopes: ScopeItem[]`，`onToggleScope: (id: string, enabled: boolean) => void`
- 搜索与加载（同上）：`scopesQuery`、`onScopesQueryChange`、`scopesHasMore`、`onLoadMoreScopes`、`scopesPagination`
- 左侧数据：`leftData?: LeftDataItem[]` 与 `onLeftItemToggle?: (id: string, selected: boolean) => void`
- `onUserAction?: (event) => void`

## 样式与污染控制

- 组件样式需在宿主显式引入：`import '@infinilabs/search-chat-ui/dist/search-chat-ui.css'`
- 主题色样式由 `ThemeProvider` 动态注入对应 `dist/*.css`，仅在需要时插入 `<link>`，不会默认影响宿主全局。
- 我们不打包示例页的 `src/index.css`，避免额外 base 层影响。

## Tree-shaking 与打包信息

- ESM：`dist/index.js`，CJS：`dist/index.cjs`，类型：`dist/index.d.ts`
- 外部依赖：`react`、`react-dom`（不会被重复打包到你的项目里）。

## 示例不包含在构建中

`src/App.tsx` 仅用于包内示例验证，不会被打包至发布产物。

## 变更日志

请见提交记录或工作区文档。
