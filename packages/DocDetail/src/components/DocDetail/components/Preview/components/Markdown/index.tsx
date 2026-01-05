import { XMarkdown, type XMarkdownProps } from "@ant-design/x-markdown";
import { useEffect, useState, type FC } from "react";

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

  return <XMarkdown {...rest} content={content} />;
};

export default Markdown;
