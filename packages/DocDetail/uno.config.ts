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
    },
  },
  preflights: [
    {
      layer: "base",
      getCSS: () => `
      :root {
        --color-primary: ${lightToken.colorPrimary};
      }

      .dark {
        --color-primary: ${darkToken.colorPrimary};
      }`,
    },
  ],
});
