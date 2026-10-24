// Standalone build config for the package's prebuilt stylesheet.
// Scans ONLY the package sources — the emitted CSS is self-contained
// (utilities + the shadcn CSS-variable palette defaults below), so
// non-tailwind products (coco/antd) consume the components by importing
// dist/pipeline-ui.css once. Tailwind products (logpilot) keep their
// own JIT pipeline and don't need this file.
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
      },
    },
  },
  corePlugins: { preflight: false },
};
