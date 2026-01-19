import { type ComponentProps } from "@ant-design/x-markdown";
import { type FC } from "react";
import { Mermaid, CodeHighlighter } from "@ant-design/x";
import { Typography } from "antd";

const { Text } = Typography;

const Code: FC<ComponentProps> = (props) => {
  const { className, children } = props;
  const lang = className?.match(/language-(\w+)/)?.[1] ?? "";

  if (typeof children !== "string") return null;

  if (lang === "mermaid") {
    return <Mermaid>{children}</Mermaid>;
  }

  if (lang) {
    return <CodeHighlighter lang={lang}>{children}</CodeHighlighter>;
  }

  return <Text code>{children}</Text>;
};

export default Code;
