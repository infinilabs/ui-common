# @infinilabs/entity-ui 使用说明

Customized Entity components

**概述**

- `@infinilabs/entity-ui` 是一个用于展示“实体信息”的 UI 组件库，当前包含组件：
  - `EntityCard`：基于 `antd` Popover 的锚定式信息卡片，贴近触发元素显示，支持富信息内容与自动定位。
  - `EntityLabel`：行内标签型组件，展示实体的基本信息（颜色块、图标、标题、子标题、右侧外链）。
  - `EntityUser`：用于展示用户信息的行内组件，语法同 `EntityLabel`，更便捷地适配“用户实体”的常见样式。
- 采用命名导出，支持 tree-shaking。

**安装**
- 组件需要 `react` 与 `react-dom` 作为对等依赖（peerDependencies）。
```bash
pnpm add @infinilabs/entity-ui
```

**导入方式**
- 推荐从根入口命名导入：
```tsx
import { EntityCard, EntityLabel, EntityUser } from '@infinilabs/entity-ui';
```

**快速上手**
- 行内标签 + 悬浮卡片的常见组合：

```tsx
import { useState } from 'react';
import { EntityCard, EntityLabel } from '@infinilabs/entity-ui';

export default function Demo() {
  const data = {
    style: { width: '376px', max_height: '500px', cover_max_height: '172px' },
    color: '#027FFE',
    icon: 'mail',
    title: '示例主题',
    subtitle: '示例子标题',
    url: 'https://example.com',
    cover: 'https://picsum.photos/640/360',
    categories: ['示例组织', '示例部门'],
    properties: [
      { icon: 'email', value: 'user@example.com' },
      { icon: 'datetime', value: '2025-08-21T15:34:25Z', view: 'datetime_with_time_zone' },
      { icon: 'tags', value: ['重要', '待办'], view: 'tags' },
    ],
    details: { table: { rows: [{ columns: [{ label: '备注', value: '请及时处理' }] }] } },
    tags: ['工作', '提醒'],
  };

  return (
    <div style={{ position: 'relative', height: '60vh', padding: 24 }}>
      <EntityLabel
        data={{
          type: 'user',
          id: 'user-demo',
          icon: 'user',
          title: '示例用户',
          color: '#0f0f0f',
          subtitle: '示例部门',
          url: 'mailto:user@example.com',
        }}
      />
      <div style={{ marginTop: 16 }}>
        <EntityCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
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
  - `triggerType?: "click" | "hover"` 默认 `"hover"`。
  - `hoverOpenDelay?: number` 悬停延迟（毫秒），默认 `500`。
  - `closeDelay?: number` 悬停离开延迟关闭（毫秒），默认 `200`。
  - `placement?: "left" | "right" | "top" | "bottom"` 默认 `"right"`。
  - `autoPlacement?: boolean` 打开前根据视窗与触发表剩余空间自动选方向（优先级 `right → left → bottom → top`）。
  - `open?: boolean`、`onOpenChange?: (open: boolean) => void` 支持受控模式。
  - `trigger?: React.ReactNode` 自定义触发节点（默认一个 `Button`）。
  - 弹层容器优先挂载到触发元素（`getPopupContainer={() => triggerRef.current || document.body}`）。
  - 弹层内部移除默认内边距（`overlayInnerStyle={{ padding: 0 }}`）。

- 数据结构（`data`）
  - `style?: { width?: string; height?: string; max_width?: string; max_height?: string; cover_max_height?: string }`
  - `color?: string`、`icon?: string`、`title?: string`、`subtitle?: string`、`url?: string`、`cover?: string`
  - `categories?: string[]` 面包屑
  - `tags?: string[]` 标签
  - `properties?: { icon?: string; value?: any; view?: string; payload?: any }[]`
  - `details?: { table?: { rows?: { columns?: { label?: string; value?: any; view?: string; payload?: any }[] }[] } }`
  - 图标支持：
    - 当 `icon` 为 `http/https` URL 时，以 `<img>` 加载（尺寸与布局与 lucide 图标保持一致）。
    - 其他字符串按 lucide-react 名称解析，内置别名：`user→User`, `email/mail→Mail`, `phone→Phone`, `datetime/date→Calendar`, `time→Clock`, `tags→Tag`；`kebab-case` 自动转为 `PascalCase`。

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

**组件：EntityLabel / EntityUser**
- 行内展示实体信息，语法一致，`EntityUser` 常用于用户场景。
- Props
  - `data?: { type?: string; id?: string; icon?: string; title?: string; color?: string; subtitle?: string; url?: string; style?: { width?: string } }`
- 图标支持
  - `data.icon` 为 URL 时使用 `<img>`；否则按 lucide 名称解析（含别名与 `kebab→Pascal` 自动转换）。
- 示例
```tsx
import { EntityLabel, EntityUser } from '@infinilabs/entity-ui';

export default function LabelDemo() {
  return (
    <>
      <EntityLabel data={{ type: 'user', id: 'user-demo', icon: 'user', title: '示例用户', color: '#0f0f0f', subtitle: '示例部门', url: 'mailto:user@example.com' }} />
      <EntityUser data={{ type: 'user', id: 'u_only_icon', icon: 'https://picsum.photos/40?random=12' }} />
    </>
  );
}
```

**尺寸与滚动（EntityCard）**
- 使用 `data.style.width/height/max_width/max_height` 控制内容尺寸；
- 当内容高度超过 `max_height` 时，内容区域纵向滚动；
- 封面最大高度通过 `data.style.cover_max_height` 控制；
- 弹层内边距已移除，避免双重间距（`overlayInnerStyle={{ padding: 0 }}`）。

**常见问题**
- 无法找到默认导出：使用命名导出 `import { EntityCard, EntityLabel, EntityUser } from '@infinilabs/entity-ui'`。
- 悬停闪烁或误关闭：确认触发区与弹层是否存在遮挡（`z-index`）、指针事件设置是否合理；组件默认将弹层容器绑定到触发元素以减少误判。
- 点击触发：将 `triggerType` 设置为 `"click"` 并视需要调整延迟为 `0`。

**对等依赖（peerDependencies）建议**
- 将 `react` 与 `react-dom` 设为对等依赖，并在宿主应用中提供它们，以避免重复打包与版本冲突。