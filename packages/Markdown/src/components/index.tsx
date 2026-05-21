import { XMarkdown, type XMarkdownProps } from "@ant-design/x-markdown";
import { StyleProvider, createCache } from "@ant-design/cssinjs";
import clsx from "clsx";
import { useEffect, useMemo, useState, type FC } from "react";
import { Typography } from "antd";

import "virtual:uno.css";

import Code from "./Code";
import Table from "./Table";

const { Link } = Typography;

export interface MarkdownProps extends XMarkdownProps {
  // You may provide either the 'url' or 'content' parameter. If a URL is provided, the content will be retrieved via request.
  url?: string;
  requestHeaders?: Record<string, string>;
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { url, requestHeaders, className, components, ...rest } = props;

  const [content, setContent] = useState(rest.content);

  // Use an isolated CSS-in-JS cache to prevent style cleanup from affecting external projects.
  // Without this, unmounting the Markdown component would remove shared antd CSS variable
  // style elements (e.g. style[data-token-hash]) from the parent application.
  const styleCache = useMemo(() => createCache(), []);

  const fetchContent = async (url: string) => {
    const response = await fetch(url, {
      headers: requestHeaders,
    });

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
    <StyleProvider cache={styleCache}>
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
    </StyleProvider>
  );
};

export default Markdown;
