import { memo, useState, useEffect, forwardRef, useImperativeHandle, useRef, useMemo } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import clsx from "clsx";
import i18nInstance from "../i18n/config";
import Markdown from "@infinilabs/markdown";

import logoImg from "../assets/icon.svg";
import type { IChatMessage, IChunkData } from "../types/chat";
export type { IChatMessage, IChunkData };
import { QueryIntent } from "./QueryIntent";
import { CallTools } from "./CallTools";
import { FetchSource } from "./FetchSource";
import { PickSource } from "./PickSource";
import { DeepRead } from "./DeepRead";
import { Think } from "./Think";
import { MessageActions } from "./MessageActions";
import { SuggestionList } from "./SuggestionList";
import { UserMessage } from "./UserMessage";
import FontIcon from "./Common/Icons/FontIcon";
import useMessageChunkData from "../hooks/useMessageChunkData";
import { DeepResearch } from "./DeepResearch";
import { PayloadCard } from "./PayloadCard";
import type {
  StepItem,
  StepStatus,
  StepSearch,
  StepSearchStatus,
  StepSearchHit,
} from "./DeepResearch/ResearchStepsContent";
import type { ResearchReportData } from "./DeepResearch/ResearchReportContent";

import "./index.css";

export interface ChatMessageProps {
  message: IChatMessage;
  isTyping?: boolean;
  onResend?: (value: string) => void;
  hide_assistant?: boolean;
  rootClassName?: string;
  actionClassName?: string;
  actionIconSize?: number;
  copyButtonId?: string;
  formatUrl?: (data: IChunkData) => string;
  theme?: "light" | "dark" | "system";
  locale?: string;
  query_intent?: IChunkData;
  tools?: IChunkData;
  fetch_source?: IChunkData;
  pick_source?: IChunkData;
  deep_read?: IChunkData;
  think?: IChunkData;
  response?: IChunkData;
  report_content?: string;
  currentAssistant?: any;
  assistantList?: any[];
  loadingStep?: Record<string, boolean>;
  deepResearchPlans?: string[];
  deepResearchCurrentStepIndex?: number;
  deepResearchQuery?: string;
  deepResearchResultCount?: number;
  deepResearchResearcherStarted?: boolean;
  deepResearchReporterStarted?: boolean;
  deepResearchReporterFinished?: boolean;
  deepResearchReportData?: ResearchReportData;
  deepResearchSearchMap?: Record<string, { query?: string; resultCount?: number; hits?: StepSearchHit[] }>;
}

export interface ChatMessageRef {
  addChunk: (chunk: IChunkData) => void;
  reset: () => void;
}

function resolveTheme(theme: "light" | "dark" | "system" | undefined): "light" | "dark" | undefined {
  if (!theme) return undefined;
  if (theme === "light") return "light";
  if (theme === "dark") return "dark";
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

const InnerChatMessage = memo(forwardRef<ChatMessageRef, ChatMessageProps>(function InnerChatMessage({
  message,
  isTyping,
  onResend,
  hide_assistant = false,
  rootClassName,
  actionClassName,
  actionIconSize,
  copyButtonId,
  formatUrl,
  theme,
  locale,
  query_intent: prop_query_intent,
  tools: prop_tools,
  fetch_source: prop_fetch_source,
  pick_source: prop_pick_source,
  deep_read: prop_deep_read,
  think: prop_think,
  response: prop_response,
  currentAssistant,
  assistantList,
  loadingStep: externalLoadingStep,
  deepResearchPlans: prop_deepResearchPlans,
  deepResearchCurrentStepIndex: prop_deepResearchCurrentStepIndex,
  deepResearchQuery: prop_deepResearchQuery,
  deepResearchResultCount: prop_deepResearchResultCount,
  deepResearchResearcherStarted: prop_deepResearchResearcherStarted,
  deepResearchReporterStarted: prop_deepResearchReporterStarted,
  deepResearchReporterFinished: prop_deepResearchReporterFinished,
  deepResearchReportData: prop_deepResearchReportData,
  deepResearchSearchMap: prop_deepResearchSearchMap,
}, ref) {
  const { t, i18n } = useTranslation();
  const resolvedTheme = resolveTheme(theme);

  const [assistant, setAssistant] = useState<any>({});
  const [deepResearchPlans, setDeepResearchPlans] = useState<string[]>([]);
  const [deepResearchCurrentStepIndex, setDeepResearchCurrentStepIndex] = useState<number>(-1);
  const [deepResearchQuery, setDeepResearchQuery] = useState<string>("");
  const [deepResearchResultCount, setDeepResearchResultCount] = useState<number | undefined>(undefined);
  const [deepResearchResearcherStarted, setDeepResearchResearcherStarted] = useState(false);
  const [deepResearchReporterStarted, setDeepResearchReporterStarted] = useState(false);
  const [deepResearchReporterFinished, setDeepResearchReporterFinished] = useState(false);
  const [deepResearchReportData, setDeepResearchReportData] = useState<ResearchReportData | undefined>(undefined);
  const [deepResearchSearchMap, setDeepResearchSearchMap] = useState<
    Record<string, { query?: string; resultCount?: number; hits?: StepSearchHit[] }>
  >({});

  const {
    data: {
      query_intent,
      tools,
      fetch_source,
      pick_source,
      deep_read,
      think,
      response,
    },
    handlers,
    clearAllChunkData,
  } = useMessageChunkData();

  useEffect(() => {
    if (prop_query_intent) handlers.deal_query_intent(prop_query_intent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_query_intent]);

  useEffect(() => {
    if (prop_tools) handlers.deal_tools(prop_tools);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_tools]);

  useEffect(() => {
    if (prop_fetch_source) handlers.deal_fetch_source(prop_fetch_source);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_fetch_source]);

  useEffect(() => {
    if (prop_pick_source) handlers.deal_pick_source(prop_pick_source);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_pick_source]);

  useEffect(() => {
    if (prop_deep_read) handlers.deal_deep_read(prop_deep_read);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_deep_read]);

  useEffect(() => {
    if (prop_think) handlers.deal_think(prop_think);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_think]);

  useEffect(() => {
    if (prop_response) handlers.deal_response(prop_response);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop_response]);

  const [loadingStep, setLoadingStep] = useState<Record<string, boolean>>({
    query_intent: false,
    tools: false,
    fetch_source: false,
    pick_source: false,
    deep_read: false,
    think: false,
    response: false,
  });

  const activeLoadingStep = externalLoadingStep || loadingStep;

  const activeDeepResearchPlans = prop_deepResearchPlans ?? deepResearchPlans;
  const activeDeepResearchCurrentStepIndex = prop_deepResearchCurrentStepIndex ?? deepResearchCurrentStepIndex;
  const activeDeepResearchQuery = prop_deepResearchQuery ?? deepResearchQuery;
  const activeDeepResearchResultCount = prop_deepResearchResultCount ?? deepResearchResultCount;
  const activeDeepResearchResearcherStarted = prop_deepResearchResearcherStarted ?? deepResearchResearcherStarted;
  const activeDeepResearchReporterStarted = prop_deepResearchReporterStarted ?? deepResearchReporterStarted;
  const activeDeepResearchReporterFinished = prop_deepResearchReporterFinished ?? deepResearchReporterFinished;
  const activeDeepResearchReportData = prop_deepResearchReportData ?? deepResearchReportData;
  const activeDeepResearchSearchMap = prop_deepResearchSearchMap ?? deepResearchSearchMap;

  const hasDeepResearchPlan =
    activeDeepResearchPlans.length > 0 &&
    activeDeepResearchCurrentStepIndex >= 0 &&
    activeDeepResearchCurrentStepIndex < activeDeepResearchPlans.length;

  const deepResearchStepTitle = hasDeepResearchPlan
    ? activeDeepResearchPlans[activeDeepResearchCurrentStepIndex]
    : "";

  const deepResearchPlanningProgress = activeDeepResearchPlans.length > 0 ? 1 : 0;

  const deepResearchExecutionProgress = hasDeepResearchPlan
    ? (activeDeepResearchCurrentStepIndex + 1) / activeDeepResearchPlans.length
    : 0;

  const deepResearchReportProgress = activeDeepResearchReporterFinished
    ? 1
    : activeDeepResearchReporterStarted
      ? 0.5
      : 0;

  const deepResearchProgress =
    (deepResearchPlanningProgress +
      deepResearchExecutionProgress +
      deepResearchReportProgress) /
    3;

  const deepResearchStatusText = useMemo(() => {
    if (activeDeepResearchReporterFinished) {
      if (typeof activeDeepResearchResultCount === "number") {
        return `深度研究完成 · 找到 ${activeDeepResearchResultCount} 条相关结果`;
      }
      return "深度研究完成";
    }
    if (activeDeepResearchReporterStarted) {
      return "正在编写研究报告";
    }
    if (activeDeepResearchResearcherStarted) {
      return "正在执行研究计划";
    }
    if (activeDeepResearchPlans.length > 0) {
      return "正在规划研究计划";
    }
    return undefined;
  }, [
    activeDeepResearchReporterFinished,
    activeDeepResearchResultCount,
    activeDeepResearchReporterStarted,
    activeDeepResearchResearcherStarted,
    activeDeepResearchPlans.length,
  ]);

  const deepResearchSteps = useMemo<StepItem[]>(() => {
    if (!activeDeepResearchPlans.length) return [];

    return activeDeepResearchPlans.map((title, index) => {
      let status: StepStatus = "pending";

      if (activeDeepResearchReporterFinished) {
        status = "done";
      } else if (activeDeepResearchResearcherStarted) {
        if (index < activeDeepResearchCurrentStepIndex) {
          status = "done";
        } else if (index === activeDeepResearchCurrentStepIndex) {
          status = "in_progress";
        }
      }

      const searchInfo = activeDeepResearchSearchMap[title];
      const searches: StepSearch[] | undefined = searchInfo?.query
        ? [
            {
              id: `step-${index + 1}-search-1`,
              query: searchInfo.query,
              resultCount: searchInfo.resultCount,
              status:
                typeof searchInfo.resultCount === "number"
                  ? ("done" as StepSearchStatus)
                  : ("searching" as StepSearchStatus),
              hits: searchInfo.hits,
            },
          ]
        : undefined;

      return {
        id: `step-${index + 1}`,
        title,
        status,
        searches,
        showOptimizePlan: false,
      };
    });
  }, [
    activeDeepResearchPlans,
    activeDeepResearchCurrentStepIndex,
    activeDeepResearchResearcherStarted,
    activeDeepResearchReporterFinished,
    activeDeepResearchSearchMap,
  ]);

  const deepResearchAllHits = useMemo(() => {
    const allHits: StepSearchHit[] = [];
    Object.values(activeDeepResearchSearchMap).forEach((info) => {
      if (info.hits && Array.isArray(info.hits)) {
        allHits.push(...info.hits);
      }
    });
    return allHits;
  }, [activeDeepResearchSearchMap]);

  const deepResearchPlannerStatus: StepStatus = activeDeepResearchPlans.length
    ? "done"
    : "pending";

  const deepResearchExecutionStatus: StepStatus = useMemo(() => {
    if (!deepResearchSteps.length) return "pending";
    if (deepResearchSteps.some((step) => step.status === "in_progress")) {
      return "in_progress";
    }
    if (deepResearchSteps.some((step) => step.status === "done")) {
      return "done";
    }
    return "pending";
  }, [deepResearchSteps]);

  const deepResearchReportStatus: StepStatus = deepResearchReporterFinished
    ? "done"
    : deepResearchReporterStarted
      ? "in_progress"
      : "pending";

  const resetDeepResearchState = () => {
    setDeepResearchPlans([]);
    setDeepResearchCurrentStepIndex(-1);
    setDeepResearchQuery("");
    setDeepResearchResultCount(undefined);
    setDeepResearchResearcherStarted(false);
    setDeepResearchReporterStarted(false);
    setDeepResearchReporterFinished(false);
    setDeepResearchReportData(undefined);
    setDeepResearchSearchMap({});
  };

  const handleDeepResearchChunk = (chunkData: IChunkData) => {
    if (chunkData.chunk_type === "research_planner_start") {
      resetDeepResearchState();
      return;
    }

    if (chunkData.chunk_type === "research_planner_end") {
      if (typeof chunkData.message_chunk === "string") {
        try {
          const payload = JSON.parse(chunkData.message_chunk);
          if (Array.isArray(payload)) {
            const plans = payload.map((item) => String(item));
            setDeepResearchPlans(plans);
            setDeepResearchCurrentStepIndex(plans.length > 0 ? 0 : -1);
          }
        } catch (error) {
          console.error(error);
        }
      }
      return;
    }

    if (chunkData.chunk_type === "research_researcher_start") {
      if (typeof chunkData.message_chunk === "string" && chunkData.message_chunk) {
        try {
          const payload = JSON.parse(chunkData.message_chunk);
          const planText = typeof payload?.plan === "string" ? payload.plan : "";
          if (planText) {
            setDeepResearchResearcherStarted(true);
            setDeepResearchCurrentStepIndex((prevIndex) => {
              const index = deepResearchPlans.findIndex(
                (title) => title === planText
              );
              if (index !== -1) return index;
              if (prevIndex >= 0) return prevIndex;
              return 0;
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      return;
    }

    if (chunkData.chunk_type === "research_researcher_step_start") {
      if (typeof chunkData.message_chunk === "string" && chunkData.message_chunk) {
        try {
          const payload = JSON.parse(chunkData.message_chunk);
          const planText = typeof payload?.plan === "string" ? payload.plan : "";
          const stepQuery = payload?.step?.payload?.query;
          if (typeof stepQuery === "string") {
            setDeepResearchQuery(stepQuery);
          }
          setDeepResearchResultCount(undefined);
          if (planText && typeof stepQuery === "string") {
            setDeepResearchSearchMap((prev) => {
              const prevInfo = prev[planText] ?? {};
              return {
                ...prev,
                [planText]: {
                  ...prevInfo,
                  query: stepQuery,
                },
              };
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
      return;
    }

    if (chunkData.chunk_type === "research_researcher_step_end") {
      if (typeof chunkData.message_chunk === "string" && chunkData.message_chunk) {
        try {
          const payload = JSON.parse(chunkData.message_chunk);
          const planText = typeof payload?.plan === "string" ? payload.plan : "";
          const hits = payload?.step?.payload?.hits;
          if (Array.isArray(hits)) {
            setDeepResearchResultCount(hits.length);
            if (planText) {
              setDeepResearchSearchMap((prev) => {
                const prevInfo = prev[planText] ?? {};
                return {
                  ...prev,
                  [planText]: {
                    ...prevInfo,
                    resultCount: hits.length,
                    hits: hits,
                  },
                };
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      return;
    }

    if (chunkData.chunk_type === "research_researcher_end") {
      setDeepResearchQuery("");
      return;
    }

    if (chunkData.chunk_type === "research_reporter_start") {
      setDeepResearchReporterStarted(true);
      return;
    }

    if (chunkData.chunk_type === "research_reporter_end") {
      setDeepResearchReporterStarted(true);
      setDeepResearchReporterFinished(true);
      if (typeof chunkData.message_chunk === "string" && chunkData.message_chunk) {
        try {
          const payload = JSON.parse(chunkData.message_chunk);
          setDeepResearchReportData(payload);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const inThinkRef = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    addChunk: (chunkData: IChunkData) => {
      setLoadingStep(() => ({
        query_intent: false,
        tools: false,
        fetch_source: false,
        pick_source: false,
        deep_read: false,
        think: false,
        response: false,
        [chunkData.chunk_type || '']: true,
      }));

      if (chunkData.chunk_type === "reply_start") {
        resetDeepResearchState();
      } else if (chunkData.chunk_type === "query_intent") {
        handlers.deal_query_intent(chunkData);
      } else if (chunkData.chunk_type === "tools") {
        handlers.deal_tools(chunkData);
      } else if (chunkData.chunk_type === "fetch_source") {
        handlers.deal_fetch_source(chunkData);
      } else if (chunkData.chunk_type === "pick_source") {
        handlers.deal_pick_source(chunkData);
      } else if (chunkData.chunk_type === "deep_read") {
        handlers.deal_deep_read(chunkData);
      } else if (chunkData.chunk_type === "think") {
        handlers.deal_think(chunkData);
      } else if (chunkData.chunk_type === "response") {
        const message_chunk = chunkData.message_chunk;
        if (typeof message_chunk === "string") {
          if (
            message_chunk.includes("\u003cthink\u003e") ||
            message_chunk.includes("<think>")
          ) {
            inThinkRef.current = true;
            return;
          } else if (
            message_chunk.includes("\u003c/think\u003e") ||
            message_chunk.includes("</think>")
          ) {
            inThinkRef.current = false;
            return;
          }

          if (inThinkRef.current) {
            handlers.deal_think({ ...chunkData, chunk_type: "think" });
          } else {
            handlers.deal_response(chunkData);
          }
        }
      } else if (
        chunkData.chunk_type === "research_planner_start" ||
        chunkData.chunk_type === "research_planner_end" ||
        chunkData.chunk_type === "research_researcher_start" ||
        chunkData.chunk_type === "research_researcher_step_start" ||
        chunkData.chunk_type === "research_researcher_step_end" ||
        chunkData.chunk_type === "research_researcher_end" ||
        chunkData.chunk_type === "research_reporter_start" ||
        chunkData.chunk_type === "research_reporter_end"
      ) {
        handleDeepResearchChunk(chunkData);
      }
    },
    reset: () => {
      clearAllChunkData();
      setLoadingStep({
        query_intent: false,
        tools: false,
        fetch_source: false,
        pick_source: false,
        deep_read: false,
        think: false,
        response: false,
      });
      resetDeepResearchState();
      inThinkRef.current = false;
    }
  }));

  const isAssistant = message?._source?.type === "assistant";
  const assistant_id = message?._source?.assistant_id;
  const assistant_item = message?._source?.assistant_item;

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  useEffect(() => {
    if (assistant_item) {
      setAssistant(assistant_item);
      return;
    }

    if (isAssistant && assistant_id && Array.isArray(assistantList)) {
      setAssistant(
        assistantList.find((item) => item._id === assistant_id) ?? {}
      );
      return;
    }

    setAssistant(currentAssistant);
  }, [
    isAssistant,
    assistant_item,
    assistant_id,
    assistantList,
    currentAssistant,
  ]);

  const source = message?._source;
  const messageContent = source?.message || "";
  const payload = source?.payload;

  const attachments = source?.attachments ?? [];
  const details = source?.details || [];
  const question = source?.question || "";

  const showActions =
    isTyping === false && (messageContent || response?.message_chunk);

  const [suggestion, setSuggestion] = useState<string[]>([]);

  const getSuggestion = (suggestion: string[]) => {
    setSuggestion(suggestion);
  };

  const renderContent = () => {
    if (!isAssistant) {
      return <UserMessage message={messageContent} attachments={attachments} />;
    }

    return (
      <>
        <QueryIntent
          Detail={details.find((item) => item.type === "query_intent")}
          ChunkData={query_intent}
          getSuggestion={getSuggestion}
          loading={activeLoadingStep?.query_intent}
        />

        <CallTools
          Detail={details.find((item) => item.type === "tools")}
          ChunkData={tools}
          loading={activeLoadingStep?.tools}
        />

        <FetchSource
          Detail={details.find((item) => item.type === "fetch_source")}
          ChunkData={fetch_source}
          loading={activeLoadingStep?.fetch_source}
          formatUrl={formatUrl}
        />

        <PickSource
          Detail={details.find((item) => item.type === "pick_source")}
          ChunkData={pick_source}
          loading={activeLoadingStep?.pick_source}
        />

        <DeepRead
          Detail={details.find((item) => item.type === "deep_read")}
          ChunkData={deep_read}
          loading={activeLoadingStep?.deep_read}
        />

        <Think
          Detail={details.find((item) => item.type === "think")}
          ChunkData={think}
          loading={activeLoadingStep?.think}
        />

        <div className="cm-markdown">
          <Markdown content={messageContent || response?.message_chunk || ""} />
        </div>

        <PayloadCard payload={payload as any} formatUrl={formatUrl} />

        {hasDeepResearchPlan && (
          <DeepResearch
            stepTitle={deepResearchStepTitle}
            query={activeDeepResearchQuery || question}
            resultCount={activeDeepResearchResultCount}
            progress={deepResearchProgress}
            statusText={deepResearchStatusText}
            steps={deepResearchSteps}
            plannerStatus={deepResearchPlannerStatus}
            executionStatus={deepResearchExecutionStatus}
            reportStatus={deepResearchReportStatus}
            reportData={activeDeepResearchReportData}
            searchHits={deepResearchAllHits}
            formatUrl={formatUrl}
            theme={resolvedTheme}
          />
        )}

        {isTyping && (
          <div className="inline-block w-1.5 h-5 ml-0.5 -mb-0.5 bg-[#666666] dark:bg-[#A3A3A3] rounded-sm animate-typing" />
        )}

        {showActions && (
          <MessageActions
            id={message._id ?? ""}
            content={messageContent || response?.message_chunk || ""}
            question={question}
            actionClassName={actionClassName}
            actionIconSize={actionIconSize}
            copyButtonId={copyButtonId}
            onResend={() => {
              if (onResend) {
                onResend(question);
              }
            }}
          />
        )}

        {!isTyping && (
          <SuggestionList
            suggestions={suggestion}
            onSelect={(text) => onResend && onResend(text)}
          />
        )}
      </>
    );
  };

  return (
    <div
      className={clsx(
        "w-full py-8 flex",
        [isAssistant ? "justify-start" : "justify-end"],
        resolvedTheme === "dark" && "dark",
        rootClassName
      )}
    >
      <div
        className={`w-full px-4 flex gap-4 ${
          isAssistant ? "w-full" : "flex-row-reverse"
        }`}
      >
        <div
          className={`w-full space-y-2 ${
            isAssistant ? "text-left" : "text-right"
          }`}
        >
          {!hide_assistant && (
            <div className="w-full flex items-center gap-1 font-semibold text-sm text-[#333] dark:text-white">
              {isAssistant ? (
                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-white dark:bg-[#2A2A2A] border border-[#E6E6E6] dark:border-[#3A3A3A]">
                  {assistant?._source?.icon?.startsWith("font_") ? (
                    <FontIcon
                      name={assistant._source.icon}
                      className="w-4 h-4"
                    />
                  ) : (
                    <img
                      src={logoImg}
                      className="w-4 h-4"
                      alt={t("assistant.message.logo")}
                    />
                  )}
                </div>
              ) : null}
              {isAssistant ? assistant?._source?.name || "Coco AI" : ""}
            </div>
          )}
          <div className="w-full prose dark:prose-invert prose-sm max-w-none">
            <div className="w-full pl-7 text-[#333] dark:text-white leading-relaxed">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}));

export const ChatMessage = memo(forwardRef<ChatMessageRef, ChatMessageProps>((props, ref) => {
  return (
    <I18nextProvider i18n={i18nInstance}>
      <InnerChatMessage {...props} ref={ref} />
    </I18nextProvider>
  );
}));
