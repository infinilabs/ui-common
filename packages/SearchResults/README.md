# @infinilabs/search-results

搜索结果列表/宫格展示组件。

- 支持列表结果（标题、摘要、面包屑、作者/时间、缩略图、文件类型徽标等）
- 支持媒体宫格（图片/视频，支持分组、列数、底部动作）
- 组件对外只接收单个 `section`，多分组由业务侧自行组合

## 安装

```bash
pnpm add @infinilabs/search-results
```

对等依赖（peerDependencies）需要由业务侧提供：

- `react`
- `react-dom`

## 使用示例

### 1) 基础用法（单个 section）

```tsx
import SearchResults, {
  type SearchResultListItem,
  type SearchResultsSection
} from "@infinilabs/search-results";

const listItems: SearchResultListItem[] = [
  {
    type: "result",
    id: "result-0",
    title: "云原生知识检索平台：接入与使用指南",
    href: "https://example.com/docs/search-guide",
    thumbnailUrl: "https://picsum.photos/seed/ai-summary-thumb/320/180",
    fileType: "doc",
    source: "Google",
    description: "AI 摘要：本文档介绍如何配置数据源、设置分类与权限..."
  }
];

const section: SearchResultsSection = {
  type: "section",
  layout: "list",
  title: "搜索结果",
  items: listItems
};

export default function Demo() {
  return <SearchResults section={section} />;
}
```

### 2) 多个 section（业务侧自行组合）

```tsx
import SearchResults, {
  itemsToSections,
  recordsToItems,
  type SearchResultsRecord,
  type SearchResultsItem
} from "@infinilabs/search-results";

export default function Demo({
  items,
  records
}: {
  items?: SearchResultsItem[];
  records?: SearchResultsRecord[];
}) {
  const normalizedItems = items ?? recordsToItems(records ?? []);
  const sections = itemsToSections(normalizedItems, 3);
  return (
    <div className="space-y-10">
      {sections.map((section, index) => (
        <SearchResults key={`${section.title ?? section.layout}-${index}`} section={section} />
      ))}
    </div>
  );
}
```

### 3) 点击事件（埋点/接管跳转）

组件内部触发点击时，会先调用 item 自身的 `onClick`（如果有），再调用 `onItemClick`。

```tsx
import SearchResults, { type SearchResultListItem, type SearchResultsItem } from "@infinilabs/search-results";

export default function Demo({ items }: { items: SearchResultsItem[] }) {
  const listItems = items.filter((i): i is SearchResultListItem => i.type === "result");

  return (
    <SearchResults
      section={{ type: "section", layout: "list", items: listItems }}
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
| `section` | `SearchResultsSection` | 单个分组（单个 layout） |
| `className` | `string` | 根容器 class |
| `onItemClick` | `(item: SearchResultsItem) => void` | 统一点击回调 |

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
