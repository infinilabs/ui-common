import { type ComponentProps } from "@ant-design/x-markdown";
import { type FC } from "react";
import { CodeHighlighter, Mermaid } from "@ant-design/x";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Typography } from "antd";
import { useMarkdownContext } from "../context";

const { Text } = Typography;

const Code: FC<ComponentProps> = (props) => {
  const { className, children } = props;
  const { dark } = useMarkdownContext();
  const lang = className?.match(/language-(\w+)/)?.[1] ?? "";

  if (typeof children !== "string") return null;

  if (lang === "mermaid") {
    return <Mermaid>{children}</Mermaid>;
  }

  if (lang) {
    return (
      <CodeHighlighter
        lang={lang}
        highlightProps={dark ? { style: oneDark } : undefined}
      >
        {children}
      </CodeHighlighter>
    );
  }

  return <Text code>{children}</Text>;
};

export default Code;
