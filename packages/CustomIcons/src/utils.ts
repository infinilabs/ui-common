import * as LucideIcons from "lucide-react";

export const normalizeIconName = (name: string): string => {
  return name
    .trim()
    .replace(/[-_\s]+/g, " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
};

export const resolveLucideIcon = (name?: string): any | null => {
  if (!name) return null;
  const direct = (LucideIcons as any)[name];
  if (direct) return direct;
  const normalized = normalizeIconName(name);
  return (LucideIcons as any)[normalized] || null;
};

