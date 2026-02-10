import React from "react";
import { Typography } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DocViewRenderProps } from "../../doc_views/doc_views_types";

const { Paragraph } = Typography;

export function JsonCodeBlock({ hit, theme }: DocViewRenderProps) {
  const isDark = theme === 'dark';
  const codeString = JSON.stringify(hit, null, 2);
  return (
    <div className="relative group rounded-md border border-solid border-[var(--ant-color-border-secondary)] overflow-hidden">
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Paragraph copyable={{ text: codeString }} className="mb-0" />
      </div>

      <SyntaxHighlighter
        key={isDark ? 'dark' : 'light'}
        language="json"
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          width: '100%'
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
