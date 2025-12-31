import { defineConfig, transformerVariantGroup } from "unocss";
import { theme } from "antd";

const lightToken = theme.getDesignToken();
const darkToken = theme.getDesignToken({
  algorithm: theme.darkAlgorithm,
});

export default defineConfig({
  transformers: [transformerVariantGroup()],
  shortcuts: [["b-default", "border border-solid border-border"]],
  theme: {
    colors: {
      border: `var(--color-border)`,
      primary: `var(--color-primary)`,
      "primary-bg": `var(--color-primary-bg)`,
    },
  },
  preflights: [
    {
      layer: "base",
      getCSS: () => `
      :root {
        --color-border: ${lightToken.colorBorder};
        --color-primary: ${lightToken.colorPrimary};
        --color-primary-bg: ${lightToken.colorPrimaryBg};
      }

      .dark {
        --color-border: ${darkToken.colorBorder};
        --color-primary: ${darkToken.colorPrimary};
        --color-primary-bg: ${darkToken.colorPrimaryBg};
      }`,
    },
  ],
});
