import type { FC } from "react";
import { Collapse } from "antd";

import type { DocDetailProps } from "@/components/DocDetail";
import Markdown from "../Preview/components/Markdown";

const content = `
# Hello AI Interpretation

### 欢迎使用 XMarkdown！

- 项目1
- 项目2
- 项目3
`;

const AIInterpretation: FC<DocDetailProps> = (props) => {
  const { i18n } = props;

  return (
    <Collapse
      size="small"
      classNames={{
        root: "bg-transparent",
      }}
      items={[
        {
          key: "ai-interpretation",
          label: i18n?.labels?.aiInterpretation ?? "AI Interpretation",
          children: <Markdown content={content} />,
        },
      ]}
    />
  );
};

export default AIInterpretation;
