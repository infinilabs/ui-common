export type IconType = "lucide" | "custom";

export interface IconConfig {
  type: IconType;
  name?: string; // lucide icon name
  color?: string; // CSS color string
  size?: number; // pixel size
  dataUrl?: string; // for custom image icon
  label?: string; // optional label to display next to icon
}

export interface IconPickerControls {
  type: boolean;
  name: boolean;
  size: boolean;
  color: boolean;
  upload: boolean;
}

export type IconPickerTheme = "light" | "dark" | "auto";

export interface IconPickerI18n {
  typeLabel: string;
  nameLabel: string;
  uploadLabel: string;
  sizeLabel: string;
  colorLabel: string;
  notFound: string;
  uploadPlaceholder: string;
}
