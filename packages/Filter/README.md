# @infinilabs/filter 使用说明

Customized Entity components

**概述**

- `@infinilabs/filter` 是一个用于展示“过滤信息”的 UI 组件库，当前包含组件：
  - `FilterCollapse`：折叠容器组件，使用 `motion` 提供流畅的展开/收起动画，支持清除功能和自定义标题。
  - `FilterTags`：标签选择器，支持文本标签和图标标签两种模式，用于多值选择。
  - `FilterInput`：输入框过滤组件，基于 Ant Design Input 封装，支持文本输入过滤。
  - `FilterSlider`：滑块选择组件，基于 Ant Design Slider 封装，用于数值范围选择。
  - `FilterSelect`：下拉选择组件，基于 Ant Design Select 封装，支持单选和多选。
  - `FilterColorPicker`：颜色选择器，基于 Ant Design ColorPicker 封装，用于颜色值选择。
  - `FilterCheckboxGroup`：多选框组件，支持展示图标、标签和数量，可展开显示更多选项。
- 采用命名导出，支持 tree-shaking。

**安装**

- 组件需要 `react` 与 `react-dom` 作为对等依赖（peerDependencies）。

```bash
pnpm add @infinilabs/filter
```

**导入方式**

- 推荐从根入口命名导入：

```tsx
import { FilterCollapse } from "@infinilabs/filter";
```
