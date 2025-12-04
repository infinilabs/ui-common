# @infinilabs/custom-icons

一个基于 `lucide-react` 的图标组件库，包含“配置（IconPicker）”与“渲染（ConfigurableIcon）”两大组件。

## 安装

```bash
pnpm add @infinilabs/custom-icons lucide-react react react-dom
```

`react`、`react-dom`、`lucide-react` 为 peer 依赖，需要由使用方安装。

## 渲染组件（ConfigurableIcon）

```tsx
import { ConfigurableIcon } from "@infinilabs/custom-icons";

export default function Example() {
  return (
    <ConfigurableIcon type="lucide" name="Bot" color="#0287FF" size={24} />
  );
}
```

### Props
- `type`: `lucide | custom`
- `name`: `lucide-react` 图标名称（自动标准化，如 "bot" 或 "Bot"）
- `color`: 颜色（默认 `#0287FF`）
- `size`: 尺寸（px，默认 `24`）
- `dataUrl`: 当 `type=custom` 时的图片 `data:` URL

## 配置组件（IconPicker）

从 `lucide-react` 库中选择图标并实时预览。

```tsx
import { IconPicker } from "@infinilabs/custom-icons";

function PickerDemo() {
  const [config, setConfig] = useState({ type: "lucide", name: "Bot", color: "#0287FF", size: 24 });
  return <IconPicker initial={config} onChange={setConfig} />;
}
```

### Props
- `initial`: 初始配置（可选）
- `onChange(config)`: 每次变更时回调（可选）
- `showList`: 是否显示 `datalist` 名称列表（默认 `true`）
- `configurable`: 是否展示配置面板（默认 `true`）
- `controls`: 控制各项是否展示（可选）
- `theme`: 主题，`'light' | 'dark' | 'auto'`（默认 `auto`）
- `i18n`: 覆盖文案 `{ typeLabel, nameLabel, uploadLabel, sizeLabel, colorLabel, notFound }`
- `locale`: 语言代码（如 `zh-CN` / `en-US`），优先于浏览器语言

#### `controls` 结构
```ts
type IconPickerControls = {
  type: boolean;   // icon type (lucide/custom)
  name: boolean;   // lucide icon name input
  size: boolean;   // icon size in px
  color: boolean;  // icon color
  upload: boolean; // custom image upload
}
```

### 主题与国际化示例
```tsx
<IconPicker initial={config} theme="light" locale="zh-CN" />
<IconPicker initial={config} theme="dark" locale="zh-CN" />
<IconPicker initial={config} theme="auto" locale="en-US" />

// override English labels
<IconPicker
  initial={config}
  theme="auto"
  locale="en-US"
  i18n={{
    typeLabel: "Icon type",
    nameLabel: "Pick lucide icon",
    uploadLabel: "Upload image",
    sizeLabel: "Size(px)",
    colorLabel: "Color",
  }}
/> 
```

### 自定义图片模式示例
```tsx
<IconPicker
  initial={{ type: "custom", size: 24 }}
  controls={{ type: true, upload: true, size: true, color: true, name: false }}
/> 
```

## 类型导入用法

在 TypeScript 中，组件按值导入，类型使用 `import type` 进行类型仅导入：

```ts
import { IconPicker, ConfigurableIcon } from "@infinilabs/custom-icons";
import type { IconConfig, IconPickerControls, IconPickerI18n } from "@infinilabs/custom-icons";

const initial: IconConfig = {
  type: "lucide",
  name: "Bot",
  size: 28,
  color: "#1e90ff",
};
```

如果是纯 JavaScript 项目，也可以通过 JSDoc 获取类型提示：

```js
/** @type {import('@infinilabs/custom-icons').IconConfig} */
const initial = { type: 'lucide', name: 'Bot', size: 28, color: '#1e90ff' };
```
