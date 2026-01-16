import {
  XMarkdown,
  type ComponentProps,
  type XMarkdownProps,
} from "@ant-design/x-markdown";
import { useEffect, useState, type FC } from "react";
import { Mermaid, CodeHighlighter } from "@ant-design/x";
import { Typography } from "antd";
import clsx from "clsx";

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

interface MarkdownProps extends XMarkdownProps {
  url?: string;
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { url, className, ...rest } = props;

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

  return (
    <XMarkdown
      {...rest}
      className={clsx("[&_h1,h2,h3,h4,h5,h6,ul,ol,p]:[all:revert]", className)}
      content={content}
      components={{ code: Code }}
    />
  );
};

export default Markdown;
