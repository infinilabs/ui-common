import React, { useRef, useState } from "react";
import { IconPickerTheme } from "./types";

export interface UploadInputProps {
  accept?: string;
  onChange?: (file: File | null, e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel?: string;
  placeholder?: string;
  width?: number;
  theme?: IconPickerTheme;
  locale?: string;
  disabled?: boolean;
}

const UploadInput: React.FC<UploadInputProps> = ({
  accept,
  onChange,
  buttonLabel,
  placeholder,
  width = 220,
  theme = "auto",
  locale,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const userLocale = locale || (typeof navigator !== "undefined" ? navigator.language : "");
  const langIsZh = /zh/i.test(userLocale || "");
  const finalButton = buttonLabel || (langIsZh ? "选择文件" : "Choose File");
  const finalPlaceholder = placeholder || (langIsZh ? "未选择文件" : "No file chosen");

  const isDark = (() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    if (typeof document !== "undefined") {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      if (hasDarkClass) return true;
    }
    return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  })();
  const tokens = isDark
    ? {
        surface: "#111827",
        border: "#374151",
        text: "#e5e7eb",
        muted: "#9ca3af",
        buttonBg: "#374151",
      }
    : {
        surface: "#ffffff",
        border: "#e5e7eb",
        text: "#111827",
        muted: "#6b7280",
        buttonBg: "#f3f4f6",
      };

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    setFileName(f ? f.name : "");
    onChange && onChange(f || null, e);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 32,
        padding: "4px 8px",
        borderRadius: 8,
        border: `1px solid ${tokens.border}`,
        background: tokens.surface,
        color: tokens.text,
        width,
        boxSizing: "border-box",
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        style={{
          height: 24,
          padding: "0 10px",
          borderRadius: 6,
          border: `1px solid ${tokens.border}`,
          background: tokens.buttonBg,
          color: tokens.text,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {finalButton}
      </button>
      <span
        style={{
          fontSize: 12,
          color: tokens.muted,
          flex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {fileName || finalPlaceholder}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UploadInput;

