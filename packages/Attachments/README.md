# @infinilabs/attachments

一个用于展示附件列表的 React 组件库（基于 antd + UnoCSS）。

## 安装

```bash
pnpm add @infinilabs/attachments
```

## 使用

```tsx
import { Attachments } from "@infinilabs/attachments";

export function Demo() {
  return (
    <Attachments
      data={[
        {
          id: "1",
          filename: "report.pdf",
          extname: "pdf",
          size: "1.2MB",
          status: "uploaded",
        },
        {
          id: "2",
          filename: "model.bin",
          extname: "bin",
          status: "uploading",
        },
      ]}
      i18n={{
        labels: {
          uploading: "上传中…",
          analyzing: "分析中…",
          failed: "上传失败",
        },
      }}
      onItemPress={(item) => {
        console.log("press", item);
      }}
      onItemRemove={(item) => {
        console.log("remove", item);
      }}
    />
  );
}
```

## API

### `<Attachments />`

- `data: AttachmentProps[]`：附件数据列表（必填）
- `i18n?: { labels?: { uploading?: string; analyzing?: string; failed?: string } }`：文案覆盖
- `onItemPress?: (item: AttachmentProps) => void`：点击附件回调
- `onItemRemove?: (item: AttachmentProps) => void`：移除附件回调
- 其余 props 透传到外层 `div`（`HTMLAttributes<HTMLDivElement>`）

### `AttachmentProps`

- `id: string`
- `status?: "uploading" | "analyzing" | "failed" | "uploaded"`
- `filename?: string`
- `extname?: string`
- `size?: string`
- `failedMessage?: string`

### `<AttachmentIcon />`

根据 `extname` 渲染对应的 SVG `<use />` 引用图标。

## 注意事项

- 组件内部会在浏览器环境下动态注入一个外部脚本（iconfont）。如果你的环境限制外网资源，请自行处理替换方案。
