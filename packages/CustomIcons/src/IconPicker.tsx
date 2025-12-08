import React, { useEffect, useMemo, useState } from "react";
import * as LucideIcons from "lucide-react";

import ConfigurableIcon from "./ConfigurableIcon";
import UploadInput from "./UploadInput";
import { IconConfig, IconPickerControls, IconPickerI18n, IconPickerTheme, IconType } from "./types";
import { resolveLucideIcon } from "./utils";

export interface IconPickerProps {
  initial?: Partial<IconConfig>;
  onChange?: (config: IconConfig) => void;
  showList?: boolean;
  showLibraryLink?: boolean;
  configurable?: boolean;
  controls?: Partial<IconPickerControls>;
  theme?: IconPickerTheme;
  i18n?: Partial<IconPickerI18n>;
  locale?: string;
}

const defaultConfig: IconConfig = {
  type: "lucide",
  name: "Bot",
  color: "#0287FF",
  size: 24,
  dataUrl: "",
  label: "示例图标",
};

const IconPicker = ({
  initial,
  onChange,
  showList = true,
  showLibraryLink = true,
  configurable = true,
  controls,
  theme = "auto",
  i18n,
  locale,
}: IconPickerProps) => {
  const [config, setConfig] = useState<IconConfig>({
    ...defaultConfig,
    ...initial,
  });

  const controlDefaults: IconPickerControls = {
    type: true,
    name: true,
    size: true,
    color: true,
    upload: true,
  };
  const enabled: IconPickerControls = { ...controlDefaults, ...(controls || {}) };

  // i18n defaults
  const zhCN: IconPickerI18n = {
    typeLabel: "图标类型",
    nameLabel: "选择 lucide 图标",
    uploadLabel: "上传图片",
    sizeLabel: "大小(px)",
    colorLabel: "颜色",
    notFound: "未找到此图标名称",
    uploadPlaceholder: "自定义图片",
  };
  const enUS: IconPickerI18n = {
    typeLabel: "Icon type",
    nameLabel: "Pick lucide icon",
    uploadLabel: "Upload image",
    sizeLabel: "Size(px)",
    colorLabel: "Color",
    notFound: "Icon name not found",
    uploadPlaceholder: "Custom image",
  };
  
  const userLocale = locale || (typeof navigator !== "undefined" ? navigator.language : "");
  const langIsZh = /zh/i.test(userLocale || "");
  const baseI18n = langIsZh ? zhCN : enUS;
  const text: IconPickerI18n = { ...baseI18n, ...(i18n || {}) };

  // theme tokens
  const isDark = (() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    // auto
    if (typeof document !== "undefined") {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      if (hasDarkClass) return true;
    }
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  })();
  const tokens = isDark
    ? {
        surface: "#1f2937", // gray-800
        border: "#374151", // gray-700
        text: "#e5e7eb", // gray-200
        muted: "#9ca3af", // gray-400
        inputBg: "#111827", // gray-900
      }
    : {
        surface: "#ffffff",
        border: "#e5e7eb",
        text: "#111827",
        muted: "#6b7280",
        inputBg: "#ffffff",
      };
  const controlBoxStyle: React.CSSProperties = {
    display: "grid",
    gap: 4,
    width: "fit-content",
    flex: "0 0 auto",
  };
  const inputStyle: React.CSSProperties = {
    height: 32,
    borderRadius: 8,
    border: `1px solid ${tokens.border}`,
    background: tokens.inputBg,
    color: tokens.text,
    padding: "0 8px",
  };

  useEffect(() => {
    onChange?.(config);
  }, [config, onChange]);

  const lucideNames: string[] = useMemo(() => Object.keys(LucideIcons), []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setConfig((c: IconConfig) => ({ ...c, dataUrl: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const Comp =
    config.type === "lucide" ? resolveLucideIcon(config.name || "") : null;

  return (
    <div style={{ display: "grid", gap: 12 }}>

      {configurable ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "4px",
              border: `1px solid ${tokens.border}`,
              borderRadius: 12,
              background: tokens.surface,
              alignSelf: "flex-end",
            }}
          >
            <ConfigurableIcon
              type={config.type as IconType}
              name={config.name}
              color={config.color}
              size={config.size}
              dataUrl={config.dataUrl}
            />
          </div>
          {enabled.type && (
            <div style={controlBoxStyle}>
              <label style={{ fontSize: 12, color: tokens.muted }}>{text.typeLabel}</label>
              <select
                value={config.type}
                onChange={(e) =>
                  setConfig((c: IconConfig) => ({
                    ...c,
                    type: e.target.value as IconType,
                  }))
                }
                style={{ ...inputStyle, width: 140 }}
              >
                <option value="lucide">lucide</option>
                <option value="custom">{text.uploadPlaceholder}</option>
              </select>
            </div>
          )}

          {config.type === "lucide" && enabled.name && (
            <div style={controlBoxStyle}>
              <label style={{ fontSize: 12, color: tokens.muted }}>
                {text.nameLabel}
                {showLibraryLink && (
                  <a
                    href="https://lucide.dev/icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: 8, color: tokens.muted, textDecoration: "underline" }}
                  >
                    lucide.dev/icons
                  </a>
                )}
              </label>
              <input
                list={showList ? "lucide-icons" : undefined}
                value={config.name || ""}
                onChange={(e) =>
                  setConfig((c: IconConfig) => ({ ...c, name: e.target.value }))
                }
                placeholder={text.uploadPlaceholder}
                style={{ ...inputStyle, width: 200 }}
              />
              {showList && (
                <datalist id="lucide-icons">
                  {lucideNames.map((n: string) => (
                    <option key={n} value={n} />
                  ))}
                </datalist>
              )}
            </div>
          )}

          {config.type === "custom" && enabled.upload && (
            <div style={controlBoxStyle}>
              <label style={{ fontSize: 12, color: tokens.muted }}>{text.uploadLabel}</label>
              <UploadInput
                accept="image/*"
                width={220}
                theme={theme}
                locale={userLocale}
                onChange={(_, e) => onFileChange(e)}
              />
            </div>
          )}

          {enabled.size && (
            <div style={controlBoxStyle}>
              <label style={{ fontSize: 12, color: tokens.muted }}>{text.sizeLabel}</label>
              <input
                type="number"
                min={12}
                max={96}
                value={config.size}
                onChange={(e) =>
                  setConfig((c: IconConfig) => ({
                    ...c,
                    size: Number(e.target.value),
                  }))
                }
                style={{ ...inputStyle, width: 120 }}
              />
            </div>
          )}

          {enabled.color && config.type !== "custom" && (
            <div style={controlBoxStyle}>
              <label style={{ fontSize: 12, color: tokens.muted }}>{text.colorLabel}</label>
              <input
                type="color"
                value={config.color}
                onChange={(e) =>
                  setConfig((c: IconConfig) => ({ ...c, color: e.target.value }))
                }
                style={{ ...inputStyle, padding: 4, width: 48 }}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: 4,
            border: `1px solid ${tokens.border}`,
            borderRadius: 12,
            background: tokens.surface,
          }}
        >
          <ConfigurableIcon
            type={config.type as IconType}
            name={config.name}
            color={config.color}
            size={config.size}
            dataUrl={config.dataUrl}
          />
        </div>
      )}
    </div>
  );
};

export default IconPicker;
