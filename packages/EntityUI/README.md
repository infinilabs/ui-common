# @infinilabs/entity-ui 使用说明

**概述**
- `@infinilabs/entity-ui` 是一个实体信息的 UI 组件库，当前包含两个组件：
  - `EntityCard`：基于 `antd` Popover 的锚定式信息卡片，贴近触发元素显示，提供富信息内容。
  - `EntityLabel`：行内展示的实体标签组件，不使用弹层，适合作为列表或表格中的标识。
- 采用命名导出（不再提供默认导出），支持同时导出多个组件，利于 tree-shaking。

**安装**
- 使用 `pnpm`（或 `npm` / `yarn`）安装组件库：
- 组件需要 `react` 与 `react-dom` 作为对等依赖（peerDependencies）。

```bash
pnpm add @infinilabs/entity-ui
```

**导入方式**
- 使用命名导入，库不再提供默认导出：
- 推荐统一从根入口导出使用：

```tsx
import { EntityCard, EntityLabel } from '@infinilabs/entity-ui';
```

**快速上手**
- 基本示例：一个行内标签 + 一个悬浮卡片

```tsx
import { useState } from 'react';
import { EntityCard, EntityLabel } from '@infinilabs/entity-ui';

export default function Demo() {
  const [count, setCount] = useState(0);

  const data = {
    style: {
      width: '420px',
      max_height: '360px',
      cover_max_height: '160px',
    },
    color: '#027FFE',
    icon: 'mail',
    title: '邮件主题',
    subtitle: '副标题',
    url: 'https://example.com',
    cover: 'https://picsum.photos/640/360',
    categories: ['邮件', '收件箱'],
    properties: [
      { icon: 'user', value: '张三' },
      { icon: 'datetime', value: '2025-10-15 10:00:00', view: 'datetime_with_time_zone' },
      { icon: 'tags', value: ['重要', '待办'], view: 'tags' },
      { value: 0.6, view: 'percent_bar', payload: { text: '处理进度' } },
    ],
    details: {
      table: {
        rows: [
          { columns: [{ label: '发件人', value: 'a@example.com' }, { label: '收件人', value: 'b@example.com' }] },
          { columns: [{ label: '备注', value: '请尽快处理' }] },
        ],
      },
    },
    tags: ['工作', '提醒'],
  };

  return (
    <div style={{ position: 'relative', height: '60vh', padding: 24 }}>
      <EntityLabel
        data={{
          type: 'user',
          id: 'uuid1',
          icon: 'user',
          title: '邹稳安',
          color: '#0f0f0f',
          subtitle: '设计总监@产品创意部',
          url: 'mailto:xxx@infinilabs.com',
        }}
      />

      <div style={{ marginTop: 16 }}>
        <EntityCard
          title="示例卡片"
          hoverOpenDelay={500}
          closeDelay={200}
          placement="right"
          autoPlacement
          data={data}
          trigger={<button className="entity-card__btn">悬停打开卡片</button>}
        />
      </div>
    </div>
  );
}
```

**组件：EntityCard**
- 定位与交互
  - `triggerType?: "click" | "hover"` 触发方式，默认 `"hover"`。
  - `hoverOpenDelay?: number` 悬停延迟打开（毫秒），默认 `500`。
  - `closeDelay?: number` 悬停离开延迟关闭（毫秒），默认 `200`。
  - `placement?: "left" | "right" | "top" | "bottom"` 默认 `"right"`。
  - `autoPlacement?: boolean` 打开前按视窗与触发表剩余空间自动选方向（优先级 `right → left → bottom → top`）。
  - `open?: boolean`、`onOpenChange?: (open: boolean) => void` 支持受控模式。
  - `trigger?: React.ReactNode` 自定义触发节点（默认一个 `Button`）。
  - 弹层容器：优先挂载到触发元素（`getPopupContainer={() => triggerRef.current || document.body}`）。
  - 内边距：移除内部容器默认 padding（`overlayInnerStyle={{ padding: 0 }}`）。

- 数据结构（`data`，驱动内容）
  - `style?: { width?: string; height?: string; max_width?: string; max_height?: string; cover_max_height?: string }`
  - `color?: string`、`icon?: string`、`title?: string`、`subtitle?: string`、`url?: string`、`cover?: string`
  - `categories?: string[]` 面包屑
  - `tags?: string[]` 标签
  - `properties?: { icon?: string; value?: any; view?: string; payload?: any }[]`
  - `details?: { table?: { rows?: { columns?: { label?: string; value?: any; view?: string; payload?: any }[] }[] } }`
  - 图标支持：
    - 当 `icon` 为 `http/https` URL 时，以 `<img>` 加载（尺寸与布局与 lucide 图标保持一致）。
    - 其他字符串按 lucide-react 名称解析，内置别名：`user→User`, `email/mail→Mail`, `phone→Phone`, `datetime/date→Calendar`, `time→Clock`, `tags→Tag`；`kebab-case` 自动转为 `PascalCase`。

- 受控模式示例

```tsx
import React, { useState } from 'react';
import { EntityCard } from '@infinilabs/entity-ui';

export default function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <EntityCard
        title="受控卡片"
        open={open}
        onOpenChange={setOpen}
        hoverOpenDelay={400}
        closeDelay={250}
        autoPlacement
        placement="right"
        data={{ style: { width: '420px', max_height: '320px' }, title: '受控内容' }}
        trigger={<button className="entity-card__btn">悬停或点击打开</button>}
      />
      <button onClick={() => setOpen((v) => !v)} style={{ marginLeft: 12 }}>
        切换打开
      </button>
    </>
  );
}
```

- 多位置触发示例（测试自动定位）

```tsx
import { EntityCard } from '@infinilabs/entity-ui';

export default function AutoPlacementDemo({ data }: { data: any }) {
  return (
    <div style={{ position: 'relative', height: '80vh', padding: 24 }}>
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <EntityCard title="" triggerType="hover" hoverOpenDelay={500} autoPlacement data={data} trigger={<button>左上角</button>} />
      </div>
      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <EntityCard title="" triggerType="hover" hoverOpenDelay={500} autoPlacement data={data} trigger={<button>右上角</button>} />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <EntityCard title="" triggerType="hover" hoverOpenDelay={500} autoPlacement data={data} trigger={<button>页面中间</button>} />
      </div>
      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <EntityCard title="" triggerType="hover" hoverOpenDelay={500} autoPlacement data={data} trigger={<button>左下角</button>} />
      </div>
      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <EntityCard title="" triggerType="hover" hoverOpenDelay={500} autoPlacement data={data} trigger={<button>右下角</button>} />
      </div>
    </div>
  );
}
```

**组件：EntityLabel**
- 功能概述
  - 行内展示实体信息，不使用弹层。
  - 渲染颜色块、图标（URL 或 lucide 名称）、标题、子标题、右侧外链。

- Props
  - `data?: { type?: string; id?: string; icon?: string; title?: string; color?: string; subtitle?: string; url?: string; style?: { width?: string } }`

- 图标支持
  - `data.icon` 如果是 `http/https` URL，则用 `<img>` 渲染；
  - 否则按 lucide 名称解析（同上别名与 `kebab→Pascal` 转换）。

- 使用示例

```tsx
import { EntityLabel } from '@infinilabs/entity-ui';

export default function LabelDemo() {
  return (
    <>
      <EntityLabel
        data={{
          type: 'user',
          id: 'user-zouwenan',
          icon: 'user',
          title: '邹稳安',
          color: '#0f0f0f',
          subtitle: '设计总监@产品创意部',
          url: 'mailto:xxx@infinilabs.com',
        }}
      />
      <EntityLabel
        data={{
          type: 'service',
          id: 'svc-1',
          icon: 'https://cdn.example.com/icons/service.png',
          title: '服务 A',
          color: '#027FFE',
          subtitle: '生产环境',
          url: 'https://example.com/service/a',
        }}
      />
    </>
  );
}
```

**尺寸与滚动（EntityCard）**
- 使用 `data.style.width/height/max_width/max_height` 控制内容尺寸；
- 当内容高度超过 `max_height` 时，纵向滚动可见；
- 封面最大高度通过 `data.style.cover_max_height` 控制；
- 弹层内边距已移除，避免双重间距（`overlayInnerStyle={{ padding: 0 }}`）。

**常见问题**
- 导入失败或无法找到默认导出：请确认使用命名导出形式：`import { EntityCard, EntityLabel } from '@infinilabs/entity-ui'`。
- 悬停闪烁或误关闭：确认触发区与弹层是否存在遮挡（`z-index`）、指针事件设置是否合理；组件已将弹层容器绑定到触发元素以减少误判。
- 点击触发：将 `triggerType` 设置为 `"click"` 即可；同时可按需调整打开/关闭延迟为 `0`。

**迁移说明（从早期版本）**
- 移除默认导出；现在仅使用命名导出。
- `EntityCard` 已从 `Modal` 迁移到 `Popover`，不再使用 `mask`；修复了悬停闪烁与误判问题。
- 保留 `popupMode` / `modalTitle` / `hoverAutoClose` 等字段用于兼容，但当前版本未使用。

**对等依赖（peerDependencies）建议**
- 将 `react` 与 `react-dom` 设为对等依赖，并在宿主应用中提供它们，以避免重复打包与版本冲突。