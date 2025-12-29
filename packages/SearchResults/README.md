# @infinilabs/search-results

搜索结果列表/宫格展示组件。

- 支持列表结果（标题、摘要、面包屑、作者/时间、缩略图、文件类型徽标等）
- 支持媒体宫格（图片/视频，支持分组、列数、底部动作）
- 支持 `items` 直接渲染，也支持 `records` 自动转换渲染
- 支持 `sections` 进行更高级的分组与布局自定义

## 安装

```bash
pnpm add @infinilabs/search-results
```

对等依赖（peerDependencies）需要由业务侧提供：

- `react`
- `react-dom`

## 使用示例

### 1) 基础用法（items）

```tsx
import SearchResults, { type SearchResultsItem } from "@infinilabs/search-results";

const items: SearchResultsItem[] = [
  {
    type: "result",
    id: "result-0",
    title: "云原生知识检索平台：接入与使用指南",
    href: "https://example.com/docs/search-guide",
    thumbnailUrl: "https://picsum.photos/seed/ai-summary-thumb/320/180",
    fileType: "doc",
    source: "Google",
    description: "AI 摘要：本文档介绍如何配置数据源、设置分类与权限...",
  },
  {
    type: "imageGroup",
    id: "image-group-1",
    title: "图片",
    columns: 3,
    footerAction: { label: "所有图片 >", href: "#" },
    items: [
      {
        type: "media",
        id: "img-1",
        mediaType: "image",
        title: "云原生技术架构白皮书",
        href: "#",
        thumbnailUrl: "https://picsum.photos/seed/image-group-1/800/600",
        sourceLabel: "Google Drive",
        categoryLabel: "素材",
      },
    ],
  },
];

export default function Demo() {
  return <SearchResults items={items} />;
}
```

### 2) 使用 records（自动转换）

当你的数据更接近后端返回结构时，可以直接传 `records`，组件会将其转换为列表结果并渲染。

```tsx
import SearchResults, { type SearchResultsRecord } from "@infinilabs/search-results";

const records: SearchResultsRecord[] = [
  {
    title: "Q3 Business Report",
    url: "https://drive.google.com/file/d/abc123/view",
    summary: "An overview of the company financial performance for Q3.",
    source: { name: "My Hugo Site", id: "e806831dacc3" },
    categories: ["business", "quarterly_reports"],
    thumbnail: "https://picsum.photos/seed/report-thumb/320/180",
    metadata: { file_extension: "pdf" },
    last_updated_by: {
      user: { username: "editor123" },
      timestamp: "2024-11-01T15:30:00Z",
    },
  },
];

export default function Demo() {
  return <SearchResults records={records} />;
}
```

### 3) 点击事件（埋点/接管跳转）

组件内部触发点击时，会先调用 item 自身的 `onClick`（如果有），再调用 `onItemClick`。

```tsx
import SearchResults, { type SearchResultsItem } from "@infinilabs/search-results";

export default function Demo({ items }: { items: SearchResultsItem[] }) {
  return (
    <SearchResults
      items={items}
      onItemClick={(item) => {
        console.log("clicked", item);
      }}
    />
  );
}
```

## 参数说明（Props）

```ts
import type { SearchResultsProps } from "@infinilabs/search-results";
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `sections` | `SearchResultsSection[]` | 完全自定义分组与布局；传入后优先使用 |
| `items` | `SearchResultsItem[]` | 直接传入已归一化的结果项；未传 `sections` 时优先使用 |
| `records` | `SearchResultsRecord[]` | 原始记录；组件会转换为列表项（`result`）并渲染 |
| `imageGridColumns` | `2 \| 3 \| 4` | 自动分组时图片/媒体宫格的默认列数 |
| `className` | `string` | 根容器 class |
| `onItemClick` | `(item: SearchResultsItem) => void` | 统一点击回调 |

优先级规则：

- `sections` > `items` > `records`

## 类型导出

```ts
import type {
  SearchResultsItem,
  SearchResultsSection,
  SearchResultsRecord,
  SearchResultListItem,
  SearchResultImageItem,
  SearchResultMediaItem,
  SearchResultFileType
} from "@infinilabs/search-results";
```

`SearchResultFileType` 支持：

- `pdf` `doc` `ppt` `xls` `link` `word` `text` `unknown`

