import { useState } from "react";

import { IconPicker, ConfigurableIcon } from "./index";
import { IconConfig } from "./types";

export default function App() {
  const [config, setConfig] = useState<IconConfig>({
    type: "lucide",
    name: "Bot",
    color: "#0287FF",
    size: 28,
    label: "示例图标",
  });

  return (
    <div style={{ padding: 24, display: "grid", gap: 20 }}>
      <h1 style={{ fontSize: 18 }}>CustomIcons 组件库示例</h1>

      <section style={{ display: "grid", gap: 14 }}>
        <h2 style={{ fontSize: 16 }}>可配置图标示例</h2>
        <ConfigurableIcon {...config} />
      </section>

      <section style={{ display: "grid", gap: 14 }}>
        <h2 style={{ fontSize: 16 }}>基础示例</h2>
        <IconPicker initial={config} onChange={setConfig} />
      </section>

      <section style={{ display: "grid", gap: 14 }}>
        <h2 style={{ fontSize: 16 }}>主题与国际化示例</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <div style={{ minWidth: 280 }}>
            <h3 style={{ fontSize: 14 }}>Light + zh-CN</h3>
            <IconPicker initial={config} theme="light" locale="zh-CN" />
          </div>
          <div style={{ minWidth: 280 }}>
            <h3 style={{ fontSize: 14 }}>Dark + zh-CN</h3>
            <IconPicker initial={config} theme="dark" locale="zh-CN" />
          </div>
          <div style={{ minWidth: 280 }}>
            <h3 style={{ fontSize: 14 }}>Auto + en-US</h3>
            <IconPicker initial={config} theme="auto" locale="en-US" />
          </div>
          <div style={{ minWidth: 280 }}>
            <h3 style={{ fontSize: 14 }}>Auto + 自定义文案(en)</h3>
            <IconPicker
              initial={config}
              theme="auto"
              locale="en-US"
              showLibraryLink={false}
              i18n={{
                typeLabel: "Type",
                nameLabel: "Choose lucide icon",
                sizeLabel: "Size(px)",
                colorLabel: "Color",
                uploadLabel: "Upload image",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
