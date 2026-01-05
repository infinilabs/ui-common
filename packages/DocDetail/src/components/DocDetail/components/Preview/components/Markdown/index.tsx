import { XMarkdown, type XMarkdownProps } from "@ant-design/x-markdown";
import type { FC } from "react";

const defaultContent = `
# Hello World

### 欢迎使用 XMarkdown！

- 项目1
- 项目2
- 项目3
`;

const Markdown: FC<XMarkdownProps> = (props) => {
  const { content = defaultContent, ...rest } = props;

  return <XMarkdown content={content} {...rest} />;
};

export default Markdown;
