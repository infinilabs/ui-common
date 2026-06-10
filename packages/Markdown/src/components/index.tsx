import { XMarkdown, type XMarkdownProps } from "@ant-design/x-markdown";
import { StyleProvider, createCache } from "@ant-design/cssinjs";
import clsx from "clsx";
import { useEffect, useMemo, useState, type FC } from "react";
import { ConfigProvider, theme, Typography } from "antd";

import "virtual:uno.css";

import Code from "./Code";
import Table from "./Table";
import { MarkdownContext } from "./context";

const { Link: AntLink } = Typography;

const Link: FC<Record<string, unknown>> = ({
  domNode,
  streamStatus,
  ...rest
}) => <AntLink {...rest} />;

export interface MarkdownProps extends XMarkdownProps {
  // You may provide either the 'url' or 'content' parameter. If a URL is provided, the content will be retrieved via request.
  url?: string;
  requestHeaders?: Record<string, string>;
  // Enable dark mode for the markdown component
  dark?: boolean;
}

const Markdown: FC<MarkdownProps> = (props) => {
  const { url, requestHeaders, className, components, dark, ...rest } = props;

  const [content, setContent] = useState(rest.content);

  // Use an isolated CSS-in-JS cache and disable cssVar to prevent style cleanup
  // from affecting external projects. Without this, unmounting the Markdown component
  // would decrement the CSS variable reference count and remove shared antd
  // style[data-token-hash] elements from the parent application.
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
      <ConfigProvider
        theme={{
          inherit: false,
          algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <MarkdownContext.Provider value={{ dark }}>
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
        </MarkdownContext.Provider>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default Markdown;
