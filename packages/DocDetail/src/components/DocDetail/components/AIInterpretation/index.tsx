import type { FC } from "react";
import { Collapse } from "antd";

import type { DocDetailProps } from "@/components/DocDetail";
import Markdown from "../Preview/components/Markdown";

const AIInterpretation: FC<DocDetailProps> = (props) => {
  const { data, i18n } = props;

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
          children: <Markdown content={data?.metadata?.ai_insights} />,
        },
      ]}
    />
  );
};

export default AIInterpretation;
