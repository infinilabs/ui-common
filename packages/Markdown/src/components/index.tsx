import { XMarkdown, type XMarkdownProps } from "@ant-design/x-markdown";
import clsx from "clsx";
import { useEffect, useState, type FC } from "react";
import { Typography } from "antd";

import "virtual:uno.css";

import Code from "./Code";
import Table from "./Table";

const { Link } = Typography;

export interface MarkdownProps extends XMarkdownProps {
  // You may provide either the 'url' or 'content' parameter. If a URL is provided, the content will be retrieved via request.
  url?: string;
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { url, className, components, ...rest } = props;

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

  useEffect(() => {
    setContent(rest.content);
  }, [rest.content]);

  return (
    <XMarkdown
      {...rest}
      className={clsx(
        "[&_:is(h1,h2,h3,h4,h5,h6,ul,ol,p)]:[all:revert]",
        className,
      )}
      content={content}
      components={{
        code: Code,
        a: Link,
        table: Table,
        ...components,
      }}
    />
  );
};

export default Markdown;
