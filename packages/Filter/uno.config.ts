import { defineConfig, transformerVariantGroup } from "unocss";
import { theme } from "antd";

const token = theme.getDesignToken();

export default defineConfig({
  transformers: [transformerVariantGroup()],
  shortcuts: [["b-default", "border border-solid border-border"]],
  theme: {
    colors: {
      border: token.colorBorder,
      primary: token.colorPrimary,
      "primary-bg": token.colorPrimaryBg,
    },
  },
});
