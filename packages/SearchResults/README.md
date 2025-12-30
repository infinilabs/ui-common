# @infinilabs/search-results

搜索结果列表/图片组/视频组展示组件。

- 支持列表结果（标题、摘要、面包屑、作者/时间、缩略图、文件类型徽标等）
- 支持媒体宫格（图片/视频，支持列数、底部动作）
- 对外提供 3 个组件：默认组件 + 图片组组件 + 视频组组件，业务侧自行选择使用哪个
- 单个组件只接收一个 `section` 入参；多段数据由业务侧自行 `map` 渲染多个组件

## 安装

```bash
pnpm add @infinilabs/search-results
```

对等依赖（peerDependencies）需要由业务侧提供：

- `react`
- `react-dom`

## 使用方式

### 1) 业务侧选择组件（推荐）

默认组件 `SearchResults` 的 `section` 类型最宽；当你明确知道当前数据是“图片组/视频组”时，推荐使用 `SearchResultsImageGroup` / `SearchResultsVideoGroup`，获得更好的类型约束。

```tsx
import SearchResults, {
  SearchResultsImageGroup,
  SearchResultsVideoGroup,
  type SearchResultImageGroupItem,
  type SearchResultVideoGroupItem,
  type SearchResultsProps,
  type SearchResultsRecord
} from "@infinilabs/search-results";

export function SectionRenderer({
  section
}: {
  section: SearchResultsProps["section"];
}) {
  if (Array.isArray(section)) {
    const first = section[0] as SearchResultsRecord | undefined;
    const recordType = typeof first?.type === "string" ? first.type.toLowerCase() : undefined;
    if (recordType === "image") return <SearchResultsImageGroup section={section as SearchResultsRecord[]} />;
    if (recordType === "video") return <SearchResultsVideoGroup section={section as SearchResultsRecord[]} />;
  }

  if (typeof section === "object" && section && "type" in section) {
    const t = (section as { type?: unknown }).type;
    if (t === "imageGroup") return <SearchResultsImageGroup section={section as SearchResultImageGroupItem} />;
    if (t === "videoGroup") return <SearchResultsVideoGroup section={section as SearchResultVideoGroupItem} />;
  }

  return <SearchResults section={section} />;
}
```

### 2) 传 `record` / `record[]`（最接近真实数据）

```tsx
import SearchResults, {
  SearchResultsImageGroup,
  SearchResultsVideoGroup,
  type SearchResultsRecord
} from "@infinilabs/search-results";

const doc: SearchResultsRecord = {
  title: "Q3 Business Report",
  type: "PDF",
  category: "report",
  url: "https://drive.google.com/file/d/abc123/view",
  thumbnail: "https://example.com/images/report_thumbnail.jpg",
  source: { name: "My Hugo Site", type: "connector", id: "e806831dacc3" }
};

const images: SearchResultsRecord[] = [
  {
    id: "img-0",
    title: "黑色壁纸全屏",
    type: "image",
    thumbnail: "https://example.com/image_thumb_0.png",
    url: "https://example.com/image_0.png",
    source: { name: "壁纸", type: "connector", id: "wallpaper" }
  }
];

const videos: SearchResultsRecord[] = [
  {
    id: "video-0",
    title: "城市夜景延时摄影",
    type: "video",
    thumbnail: "https://picsum.photos/seed/video-thumb-0/640/360",
    url: "https://example.com/video/0",
    source: { name: "视频库", type: "connector", id: "connector-video" }
  }
];

export default function Demo() {
  return (
    <div className="space-y-10">
      <SearchResults
        section={doc}
        onRecordClick={(record) => {
          if (record.url) window.open(record.url);
        }}
      />

      <SearchResultsImageGroup
        section={images}
        footerAction={{ label: "所有图片 >", href: "/search?type=image" }}
        onRecordClick={(record) => {
          if (record.url) window.open(record.url);
        }}
      />

      <SearchResultsVideoGroup
        section={videos}
        footerAction={{ label: "所有视频 >", href: "/search?type=video" }}
        onRecordClick={(record) => {
          if (record.url) window.open(record.url);
        }}
      />
    </div>
  );
}
```

说明：

- `onRecordClick` 用于业务侧接管点击（埋点/跳转/弹窗等），组件内部会让整条结果区域可点击
- 当 `onRecordClick` 存在时，组件会优先走回调，不再走默认 `href` 跳转

### 3) 传 `imageGroup` / `videoGroup`（业务侧自己组装 items）

```tsx
import {
  SearchResultsImageGroup,
  SearchResultsVideoGroup,
  type SearchResultImageGroupItem,
  type SearchResultVideoGroupItem
} from "@infinilabs/search-results";

const imageGroup: SearchResultImageGroupItem = {
  type: "imageGroup",
  id: "image-group-0",
  title: "图片组",
  columns: 3,
  footerAction: { label: "所有图片 >", href: "/search?type=image" },
  items: [
    {
      type: "image",
      id: "img-group-0",
      title: "黑色壁纸全屏",
      imageUrl: "https://example.com/image_0.png",
      subtitle: "壁纸",
      onClick: () => console.log("clicked image item")
    }
  ]
};

const videoGroup: SearchResultVideoGroupItem = {
  type: "videoGroup",
  id: "video-group-0",
  title: "视频组",
  columns: 3,
  footerAction: { label: "所有视频 >", href: "/search?type=video" },
  items: [
    {
      type: "media",
      id: "video-group-item-0",
      mediaType: "video",
      title: "城市夜景延时摄影",
      href: "https://example.com/video/0",
      thumbnailUrl: "https://picsum.photos/seed/video-thumb-0/640/360",
      breadcrumbs: ["视频库", "视频"],
      onClick: () => console.log("clicked video item")
    }
  ]
};

export default function Demo() {
  return (
    <div className="space-y-10">
      <SearchResultsImageGroup section={imageGroup} />
      <SearchResultsVideoGroup section={videoGroup} />
    </div>
  );
}
```

### 4) 多段数据（业务侧 `map` 渲染多个组件）

```tsx
import SearchResults, {
  SearchResultsImageGroup,
  SearchResultsVideoGroup,
  type SearchResultsProps
} from "@infinilabs/search-results";

export default function Demo({ data }: { data: Array<SearchResultsProps[\"section\"]> }) {
  return (
    <div className="space-y-10">
      {data.map((section, index) => {
        if (Array.isArray(section)) {
          const first = section[0] as { type?: unknown } | undefined;
          const recordType = typeof first?.type === "string" ? first.type.toLowerCase() : undefined;
          if (recordType === "image") return <SearchResultsImageGroup key={index} section={section} />;
          if (recordType === "video") return <SearchResultsVideoGroup key={index} section={section} />;
        }
        return <SearchResults key={index} section={section} />;
      })}
    </div>
  );
}
```

### 5) 点击事件（埋点/统一处理）

组件内部触发点击时，会先调用 item 自身的 `onClick`（如果有），再调用 `onItemClick`。

```tsx
import SearchResults, {
  type SearchResultListItem,
  type SearchResultsItem
} from "@infinilabs/search-results";

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

### 6) 底部动作（“查看全部”）

`footerAction` 可以写在：

- `SearchResults` / `SearchResultsImageGroup` / `SearchResultsVideoGroup` 的 `footerAction` prop 上（如果 section 本身没提供，会自动补上）
- `SearchResultsSection.footerAction` / `imageGroup.footerAction` / `videoGroup.footerAction` 上（优先级更高）

## 参数说明（Props）

```ts
import type { SearchResultsProps } from "@infinilabs/search-results";
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `section` | `SearchResultsProps["section"]` | 输入数据（section / item / record / 数组） |
| `className` | `string` | 根容器 class |
| `footerAction` | `SearchResultsAction` | 底部“查看全部”动作（可选） |
| `onRecordClick` | `(record: SearchResultsRecord, index: number) => void` | record 输入时的点击回调 |
| `onItemClick` | `(item: SearchResultsItem) => void` | 统一点击回调 |

## 工具函数

```ts
import { itemsToSections, recordsToItems } from "@infinilabs/search-results";
```

## 类型导出

```ts
import type {
  SearchResultsAction,
  SearchResultsItem,
  SearchResultsSection,
  SearchResultsRecord,
  SearchResultListItem,
  SearchResultImageItem,
  SearchResultMediaItem,
  SearchResultImageGroupItem,
  SearchResultVideoGroupItem,
  SearchResultFileType
} from "@infinilabs/search-results";
```

`SearchResultFileType` 支持：

- `pdf` `doc` `ppt` `xls` `link` `word` `text` `unknown`
