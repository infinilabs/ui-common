import type { FC } from "react";
import { Collapse } from "antd";
import Markdown from "@infinilabs/markdown";

import type { DocDetailProps } from "@/components/DocDetail";

const AIInterpretation: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

  return (
    <Collapse
      size="small"
      classNames={{
        root: "bg-transparent",
        body: "p-4!",
      }}
      items={[
        {
          key: "ai-interpretation",
          label: i18n?.labels?.aiInterpretation ?? "AI Interpretation",
          children: <Markdown content={data?.ai_insights?.text} />,
        },
      ]}
    />
  );
};

export default AIInterpretation;
