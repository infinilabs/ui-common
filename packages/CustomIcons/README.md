# @infinilabs/custom-icons

Icon components based on `lucide-react`. It provides two core parts: configuration (IconPicker) and rendering (ConfigurableIcon).

## Install

```bash
pnpm add @infinilabs/custom-icons lucide-react react react-dom
```

`react`, `react-dom`, and `lucide-react` are peer dependencies.

## Rendering (ConfigurableIcon)

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
- `name`: `lucide-react` icon name (auto-normalized, e.g. "bot" or "Bot")
- `color`: color (default `#0287FF`)
- `size`: size in px (default `24`)
- `dataUrl`: `data:` URL for custom images (when `type=custom`)

## Configuration (IconPicker)

Pick icons from `lucide-react` and preview instantly.

```tsx
import { IconPicker } from "@infinilabs/custom-icons";

function PickerDemo() {
  const [config, setConfig] = useState({ type: "lucide", name: "Bot", color: "#0287FF", size: 24 });
  return <IconPicker initial={config} onChange={setConfig} />;
}
```

### Props
- `initial`: initial configuration (optional)
- `onChange(config)`: callback on every change (optional)
- `showList`: show `datalist` name suggestions (default `true`)
- `configurable`: show configuration panel (default `true`)
- `controls`: fine-grained visibility control (optional)
- `theme`: `'light' | 'dark' | 'auto'` (default `auto`)
- `i18n`: override labels `{ typeLabel, nameLabel, uploadLabel, sizeLabel, colorLabel, notFound }`
- `locale`: language code such as `zh-CN` or `en-US` (takes precedence over browser language)

#### `controls` structure
```ts
type IconPickerControls = {
  type: boolean;   // icon type (lucide/custom)
  name: boolean;   // lucide icon name input
  size: boolean;   // size in px
  color: boolean;  // color input
  upload: boolean; // custom image upload
}
```

### Theme & i18n examples
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

### Custom image mode
```tsx
<IconPicker
  initial={{ type: "custom", size: 24 }}
  controls={{ type: true, upload: true, size: true, color: true, name: false }}
/> 
```

## Type Imports

When using TypeScript, import component values normally and import types with `import type` to keep type-only semantics.

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

If you are in plain JavaScript and still want type hints, use JSDoc:

```js
/** @type {import('@infinilabs/custom-icons').IconConfig} */
const initial = { type: 'lucide', name: 'Bot', size: 28, color: '#1e90ff' };
```
