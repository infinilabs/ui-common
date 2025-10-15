# PhysicalCard 组件使用说明

## 概述
- `PhysicalCard` 是一个基于 `antd` Popover 的“锚定式信息卡片”组件，贴近触发元素显示，适合在列表、表格、标签等场景中提供富信息的悬浮卡片。
- 支持悬停触发、延迟打开/关闭、防抖、自动位置计算（`autoPlacement`），以及受控/非受控两种状态管理。
- 卡片内容通过 `data` 字段驱动，支持封面、分类、基础信息、属性列表、表格详情、标签等。

## 安装
```bash
pnpm add @infinilabs/physical-card
```

## 导入与快速使用
- 使用默认导出（命名导入不适用当前实现）。
- 悬停 500ms 后打开，鼠标离开延迟 200ms 关闭；只要鼠标仍在触发区或弹层内容内，弹层不会关闭。

```tsx
import PhysicalCard from '@infinilabs/physical-card';

export default function Demo() {
  return (
    <PhysicalCard
      title="示例卡片"
      hoverOpenDelay={500}
      closeDelay={200}
      placement="right"
      autoPlacement
      data={{
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
          { icon: 'datetime', value: '2025-10-15 10:00:00' },
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
      }}
    />
  );
}
```

## Props
- 基础展示
  - `title: string` 用于默认触发按钮文案（例如：`打开：{title}`）
  - `subtitle?: string`、`description?: string`、`imageUrl?: string`、`actions?: { label: string; onClick?: () => void }[]`、`footer?: string`
  - 当前版本的内容渲染主要由 `data` 决定，上述字段保留用于后续扩展或触发文案
- 触发与弹出
  - `triggerType?: "click" | "hover"` 默认 `"hover"`；内部 Popover 使用 `trigger="hover"`（点击触发需要自行调整内部逻辑）
  - `trigger?: React.ReactNode` 自定义触发节点（默认是一个 `Button`）
  - `open?: boolean` 受控打开状态
  - `onOpenChange?: (open: boolean) => void` 受控状态回调
  - `hoverOpenDelay?: number` 悬停延迟打开（毫秒），默认 `500`
  - `closeDelay?: number` 悬停离开延迟关闭（毫秒），默认 `200`
  - `placement?: "left" | "right" | "top" | "bottom"` 默认 `"right"`
  - `autoPlacement?: boolean` 打开前自动计算最佳位置（见下文）
  - `width?: number` 仅用于自动定位宽度估算（实际显示宽度请用 `data.style.width`）
- 数据结构 `data`
  - `style?: { width?: string; height?: string; max_width?: string; max_height?: string; cover_max_height?: string }`
  - `color?: string`、`icon?: string`、`title?: string`、`subtitle?: string`、`url?: string`、`cover?: string`
  - `categories?: string[]` 面包屑
  - `tags?: string[]` 标签
  - `properties?: { icon?: string; value?: any; view?: string; payload?: any }[]`
  - `details?: { table?: { rows?: { columns?: { label?: string; value?: any; view?: string; payload?: any }[] }[] } }`

## 交互与行为
- 悬停打开：`hoverOpenDelay` 控制打开延迟；默认 500ms。
- 延迟关闭：`closeDelay` 控制关闭延迟；默认 200ms。
- 保持打开：鼠标在触发区或弹层内容内时不会关闭。
- 动态定位：开启 `autoPlacement` 时，打开前根据触发元素与视窗剩余空间估算期望尺寸后选择最佳方向（优先级 `right → left → bottom → top`）。
- 容器与样式：弹层优先挂载到触发元素（`getPopupContainer={() => triggerRef.current || document.body}`），内部容器无额外内边距（`overlayInnerStyle={{ padding: 0 }}`）。

## 受控模式示例
- 在需要统一管理弹层打开/关闭状态的场景使用受控模式：
```tsx:%2FUsers%2Frain9%2Finfinilabs%2Fui-common%2Fpackages%2FPhysicalCard%2Fsrc%2FApp.tsx
import React, { useState } from 'react';
import PhysicalCard from '@infinilabs/physical-card';

export default function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PhysicalCard
        title="受控卡片"
        open={open}
        onOpenChange={setOpen}
        hoverOpenDelay={400}
        closeDelay={250}
        autoPlacement
        data={{ style: { width: '420px', max_height: '320px' }, title: '受控内容' }}
      />
      <button onClick={() => setOpen((v) => !v)} style={{ marginLeft: 12 }}>切换打开</button>
    </>
  );
}
```

## 多位置触发示例（测试自动定位）
- 在页面四角和中间放置触发按钮，验证 `autoPlacement` 效果：
```tsx:%2FUsers%2Frain9%2Finfinilabs%2Fui-common%2Fpackages%2FPhysicalCard%2Fsrc%2FApp.tsx
import { useState } from 'react';
import PhysicalCard from '@infinilabs/physical-card';
import { data } from './components/data';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ position: 'relative', height: '80vh', padding: 24 }}>
      <div style={{ position: 'absolute', top: 12, left: 12 }}>
        <PhysicalCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="physical-card__btn">左上角</button>}
        />
      </div>

      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <PhysicalCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="physical-card__btn">右上角</button>}
        />
      </div>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <PhysicalCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="physical-card__btn">页面中间</button>}
        />
      </div>

      <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
        <PhysicalCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="physical-card__btn">左下角</button>}
        />
      </div>

      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <PhysicalCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="physical-card__btn">右下角</button>}
        />
      </div>
    </div>
  );
}
```

## 样式与尺寸
- 显示尺寸：使用 `data.style.width/height/max_width/max_height` 控制内容尺寸。
- 滚动：当内容高度超过 `max_height`，弹层内出现纵向滚动条（组件内部已启用溢出滚动）。
- 封面：`data.style.cover_max_height` 控制封面区域最大高度。
- 内边距：默认移除 Popover 内部容器的内边距（`overlayInnerStyle={{ padding: 0 }}`），避免重复的间距。

## 图标映射（lucide-react）
- 内置别名：`user→User`, `email/mail→Mail`, `phone→Phone`, `datetime/date→Calendar`, `time→Clock`, `tags→Tag`。
- 其他 `kebab-case` 名称自动转换为 `PascalCase` 匹配，如 `external-link→ExternalLink`；不存在则不显示图标。

## 自动位置计算（autoPlacement）
- 打开前依据触发元素位置与视窗剩余空间，估算期望尺寸后选择最佳方向：
  - 期望宽度来源于 `width` 或 `data.style.width`，默认使用 376 像素回退；
  - 期望高度约为 300 像素；若需要更精确的估算，可将内容真实尺寸通过 `data.style` 设置，与期望宽度一同提升定位准确性。
- 方向选择优先级：`right → left → bottom → top`。

## 常见问题
- 悬停仍会自动关闭：确认触发区/弹层是否存在遮挡或层级问题（如 `z-index`）；组件已将弹层容器绑定到触发元素以减少误判。
- 点击触发：当前实现以 `hover` 为主，如需点击触发可将 Popover 的 `trigger` 改为 `"click"` 并同步交互逻辑（组件内部 hover 管理逻辑需一并调整）。
- 宽度参数：`width` 仅参与自动定位宽度估算；实际显示宽度/高度请以 `data.style` 为准。

## 版本与兼容
- 组件已从 `Modal` 迁移到 `Popover`，移除了 `mask` 与相关自动关闭逻辑，修复了悬停闪烁与误判问题。
- `popupMode` / `modalTitle` / `hoverAutoClose` 等字段为兼容保留，当前版本未使用。

## 最佳实践
- 推荐设置：`hoverOpenDelay` 在 `400–600ms` 区间、`closeDelay` 在 `150–250ms` 区间，交互更平滑。
- 内容较多：使用 `max_height` 控制滚动，避免弹层过高影响定位与可用性。
- 边缘场景：启用 `autoPlacement`，在页面角落或边沿触发时效果更稳定。