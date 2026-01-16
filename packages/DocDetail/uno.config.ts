import { defineConfig, transformerVariantGroup } from "unocss";
import { theme } from "antd";

const lightToken = theme.getDesignToken();
const darkToken = theme.getDesignToken({
  algorithm: theme.darkAlgorithm,
});

export default defineConfig({
  transformers: [transformerVariantGroup()],
  theme: {
    colors: {
      primary: `var(--color-primary)`,
      border: `var(--color-border)`,
      "primary-bg": `var(--color-primary-bg)`,
      "text-secondary": `var(--color-text-secondary)`,
      "bg-layout": `var(--color-bg-layout)`,
    },
  },
  preflights: [
    {
      layer: "base",
      getCSS: () => `
      :root {
        --color-primary: ${lightToken.colorPrimary};
        --color-border: ${lightToken.colorBorder};
        --color-primary-bg: ${lightToken.colorPrimaryBg};
        --color-text-secondary: ${lightToken.colorTextSecondary};
        --color-bg-layout: ${lightToken.colorBgLayout};
      }

      .dark {
        --color-primary: ${darkToken.colorPrimary};
        --color-border: ${darkToken.colorBorder};
        --color-primary-bg: ${darkToken.colorPrimaryBg};
        --color-text-secondary: ${darkToken.colorTextSecondary};
        --color-bg-layout: ${darkToken.colorBgLayout};
      }`,
    },
  ],
});
