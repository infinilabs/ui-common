import { Loader, Hammer, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import Markdown from '@infinilabs/markdown';

import type { IChunkData } from "../types/chat";

interface CallToolsProps {
  Detail?: any;
  ChunkData?: IChunkData;
  loading?: boolean;
  t?: TFunction;
}

export const CallTools = ({ Detail, ChunkData, loading, t: tProp }: CallToolsProps) => {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);

  const [data, setData] = useState("");

  useEffect(() => {
    if (!Detail?.description) return;
    setData(Detail?.description);
  }, [Detail?.description]);

  useEffect(() => {
    if (!ChunkData?.message_chunk) return;
    setData(ChunkData?.message_chunk);
  }, [ChunkData?.message_chunk, data]);

  // Must be after hooks !!!
  if (!ChunkData && !Detail) return null;

  return (
    <div className="space-y-2 mb-3 w-full">
      <button
        onClick={() => setIsThinkingExpanded((prev) => !prev)}
        className="inline-flex items-center gap-2 px-2 py-1 rounded-xl transition-colors border border-[#E6E6E6] dark:border-[#272626]"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin text-[#1990FF]" />
            <span className="text-xs text-[#999999] italic">
              {t(`assistant.message.steps.${ChunkData?.chunk_type}`)}
            </span>
          </>
        ) : (
          <>
            <Hammer className="w-4 h-4 text-[#38C200]" />
            <span className="text-xs text-[#999999]">
              {t(`assistant.message.steps.${ChunkData?.chunk_type}`)}
            </span>
          </>
        )}

        {isThinkingExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isThinkingExpanded && (
        <div className="pl-2 pt-1 border-l-2 border-[#e5e5e5] dark:border-[#4e4e56]">
          <div className="text-[#8b8b8b] dark:text-[#a6a6a6] space-y-2 cm-markdown">
            <Markdown content={data || ""} />
            {/* {data?.split("\n").map(
              (paragraph, idx) =>
                paragraph.trim() && (
                  <p key={idx} className="text-sm">
                    {paragraph}
                  </p>
                )
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};
