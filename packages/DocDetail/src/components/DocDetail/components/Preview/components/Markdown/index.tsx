import {
  XMarkdown,
  type ComponentProps,
  type XMarkdownProps,
} from "@ant-design/x-markdown";
import { useEffect, useState, type FC } from "react";
import { Mermaid, CodeHighlighter } from "@ant-design/x";
import { Typography } from "antd";

const { Text } = Typography;

const Code: FC<ComponentProps> = (props) => {
  const { className, children } = props;
  const lang = className?.match(/language-(\w+)/)?.[1] ?? "";

  console.log("lang", lang);

  if (typeof children !== "string") return null;

  if (lang === "mermaid") {
    return <Mermaid>{children}</Mermaid>;
  }

  if (lang) {
    return <CodeHighlighter lang={lang}>{children}</CodeHighlighter>;
  }

  return <Text code>{children}</Text>;
};

interface MarkdownProps extends XMarkdownProps {
  url?: string;
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { url, ...rest } = props;

  const [content, setContent] = useState(rest.content);

  const fetchContent = async (url: string) => {
    const response = await fetch(url);

    const text = await response.text();

    setContent(text);
  };

  useEffect(() => {
    if (!url) return;

    fetchContent(url);
  }, [url]);

  return <XMarkdown {...rest} content={content} components={{ code: Code }} />;
};

export default Markdown;
