import {
  memo,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
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
  report_content?: string;
  assistantList?: any[];
  currentAssistant?: any;
}

export interface ChatMessageRef {
  addChunk: (chunk: IChunkData) => void;
  reset: () => void;
}

function resolveTheme(
  theme: "light" | "dark" | "system" | undefined,
): "light" | "dark" | undefined {
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

const InnerChatMessage = memo(
  forwardRef<ChatMessageRef, ChatMessageProps>(function InnerChatMessage(
    {
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
      assistantList,
      currentAssistant,
    },
    ref,
  ) {
    const { t, i18n } = useTranslation();
    const resolvedTheme = resolveTheme(theme);

    const [assistant, setAssistant] = useState<any>({});
    const [deepResearchPlans, setDeepResearchPlans] = useState<string[]>([]);
    const [deepResearchCurrentStepIndex, setDeepResearchCurrentStepIndex] =
      useState<number>(-1);
    const [
      deepResearchCurrentStepFinished,
      setDeepResearchCurrentStepFinished,
    ] = useState(false);
    const [deepResearchQuery, setDeepResearchQuery] = useState<string>("");
    const [deepResearchResultCount, setDeepResearchResultCount] = useState<
      number | undefined
    >(undefined);
    const [deepResearchPlannerStarted, setDeepResearchPlannerStarted] =
      useState(false);
    const [deepResearchResearcherStarted, setDeepResearchResearcherStarted] =
      useState(false);
    const [deepResearchReporterStarted, setDeepResearchReporterStarted] =
      useState(false);
    const [deepResearchReporterFinished, setDeepResearchReporterFinished] =
      useState(false);
    const [deepResearchReportData, setDeepResearchReportData] = useState<
      ResearchReportData | undefined
    >(undefined);
    const [deepResearchSearchMap, setDeepResearchSearchMap] = useState<
      Record<
        string,
        { query?: string; resultCount?: number; hits?: StepSearchHit[] }
      >
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

    const [loadingStep, setLoadingStep] = useState<Record<string, boolean>>({
      query_intent: false,
      tools: false,
      fetch_source: false,
      pick_source: false,
      deep_read: false,
      think: false,
      response: false,
      deepResearch: false,
    });

    const hasDeepResearchPlan =
      deepResearchPlans.length > 0 &&
      deepResearchCurrentStepIndex >= 0 &&
      deepResearchCurrentStepIndex < deepResearchPlans.length;

    const deepResearchStepTitle = hasDeepResearchPlan
      ? deepResearchPlans[deepResearchCurrentStepIndex]
      : "";

    const deepResearchPlanningProgress = deepResearchPlans.length > 0 ? 1 : 0;

    const deepResearchExecutionProgress = hasDeepResearchPlan
      ? (deepResearchCurrentStepIndex + 1) / deepResearchPlans.length
      : 0;

    const deepResearchReportProgress = deepResearchReporterFinished
      ? 1
      : deepResearchReporterStarted
        ? 0.5
        : 0;

    const deepResearchProgress =
      (deepResearchPlanningProgress +
        deepResearchExecutionProgress +
        deepResearchReportProgress) /
      3;

    const deepResearchStatusText = useMemo(() => {
      if (deepResearchReporterFinished) {
        if (typeof deepResearchResultCount === "number") {
          return `深度研究完成 · 找到 ${deepResearchResultCount} 条相关结果`;
        }
        return "深度研究完成";
      }
      if (deepResearchReporterStarted) {
        return "正在编写研究报告";
      }
      if (deepResearchResearcherStarted) {
        return "正在执行研究计划";
      }
      if (deepResearchPlans.length > 0) {
        return "正在规划研究计划";
      }
      return undefined;
    }, [
      deepResearchReporterFinished,
      deepResearchResultCount,
      deepResearchReporterStarted,
      deepResearchResearcherStarted,
      deepResearchPlans.length,
    ]);

    const deepResearchSteps = useMemo<StepItem[]>(() => {
      if (!deepResearchPlans.length) return [];

      return deepResearchPlans.map((title, index) => {
        let status: StepStatus = "pending";

        if (deepResearchReporterFinished || deepResearchReporterStarted) {
          status = "done";
        } else if (deepResearchResearcherStarted) {
          if (index < deepResearchCurrentStepIndex) {
            status = "done";
          } else if (index === deepResearchCurrentStepIndex) {
            status = deepResearchCurrentStepFinished ? "done" : "in_progress";
          }
        }

        const searchInfo = deepResearchSearchMap[title];
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
      deepResearchPlans,
      deepResearchReporterFinished,
      deepResearchReporterStarted,
      deepResearchResearcherStarted,
      deepResearchSearchMap,
      deepResearchCurrentStepIndex,
      deepResearchCurrentStepFinished,
    ]);

    const deepResearchAllHits = useMemo(() => {
      const allHits: StepSearchHit[] = [];
      Object.values(deepResearchSearchMap).forEach((info) => {
        if (info.hits && Array.isArray(info.hits)) {
          allHits.push(...info.hits);
        }
      });
      return allHits;
    }, [deepResearchSearchMap]);

    const deepResearchPlannerStatus: StepStatus = deepResearchPlans.length
      ? "done"
      : deepResearchPlannerStarted
        ? "in_progress"
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
      setDeepResearchCurrentStepFinished(false);
      setDeepResearchQuery("");
      setDeepResearchResultCount(undefined);
      setDeepResearchPlannerStarted(false);
      setDeepResearchResearcherStarted(false);
      setDeepResearchReporterStarted(false);
      setDeepResearchReporterFinished(false);
      setDeepResearchReportData(undefined);
      setDeepResearchSearchMap({});
    };

    const handleDeepResearchChunk = (chunkData: IChunkData) => {
      // 规划开始：重置所有状态
      if (chunkData.chunk_type === "research_planner_start") {
        resetDeepResearchState();
        setDeepResearchPlannerStarted(true);
        return;
      }

      // 规划结束：解析计划列表并初始化当前步骤索引
      if (chunkData.chunk_type === "research_planner_end") {
        if (typeof chunkData.message_chunk === "string") {
          try {
            const payload = JSON.parse(chunkData.message_chunk);
            if (Array.isArray(payload)) {
              const plans = payload.map((item) => String(item));
              setDeepResearchPlans(plans);
              // 如果有计划，设置当前步骤索引为 0，否则为 -1
              setDeepResearchCurrentStepIndex(plans.length > 0 ? 0 : -1);
            }
            setDeepResearchPlannerStarted(false);
          } catch (error) {
            console.error(error);
          }
        }
        return;
      }

      // 研究员开始：解析当前计划文本，定位并更新当前步骤索引
      if (chunkData.chunk_type === "research_researcher_start") {
        if (
          typeof chunkData.message_chunk === "string" &&
          chunkData.message_chunk
        ) {
          try {
            const payload = JSON.parse(chunkData.message_chunk);
            const planText =
              typeof payload?.plan === "string" ? payload.plan : "";
            if (planText) {
              setDeepResearchResearcherStarted(true);
              setDeepResearchCurrentStepFinished(false);
              setDeepResearchCurrentStepIndex((prevIndex) => {
                const index = deepResearchPlans.findIndex(
                  (title) => title === planText,
                );
                // 找到对应计划的索引
                if (index !== -1) return index;
                // 没找到则保持原索引或设为 0
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

      // 研究步骤开始：解析查询语句，更新搜索映射表中的 query 信息
      if (chunkData.chunk_type === "research_researcher_step_start") {
        if (
          typeof chunkData.message_chunk === "string" &&
          chunkData.message_chunk
        ) {
          try {
            const payload = JSON.parse(chunkData.message_chunk);
            const planText =
              typeof payload?.plan === "string" ? payload.plan : "";
            const stepQuery = payload?.step?.payload?.query;
            if (typeof stepQuery === "string") {
              setDeepResearchQuery(stepQuery);
            }
            // 清空当前结果计数，等待新结果
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

      // 研究步骤结束：解析搜索结果，更新搜索映射表中的 resultCount 和 hits
      if (chunkData.chunk_type === "research_researcher_step_end") {
        if (
          typeof chunkData.message_chunk === "string" &&
          chunkData.message_chunk
        ) {
          try {
            const payload = JSON.parse(chunkData.message_chunk);
            const planText =
              typeof payload?.plan === "string" ? payload.plan : "";
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

      // 研究员结束：清空查询语句，标记当前步骤已完成
      if (chunkData.chunk_type === "research_researcher_end") {
        setDeepResearchQuery("");
        setDeepResearchCurrentStepFinished(true);
        return;
      }

      // 报告员开始：标记报告员状态已启动
      if (chunkData.chunk_type === "research_reporter_start") {
        setDeepResearchReporterStarted(true);
        return;
      }

      // 报告员结束：标记报告员已完成，并保存最终报告数据
      if (chunkData.chunk_type === "research_reporter_end") {
        setDeepResearchReporterStarted(true);
        setDeepResearchReporterFinished(true);
        if (
          typeof chunkData.message_chunk === "string" &&
          chunkData.message_chunk
        ) {
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
          deepResearch: false,
          [chunkData.chunk_type || ""]: true,
        }));

        if (chunkData.chunk_type === "reply_start") {
          // resetDeepResearchState();
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
      },
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
          assistantList.find((item) => item._id === assistant_id) ?? {},
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
        return (
          <UserMessage message={messageContent} attachments={attachments} />
        );
      }

      return (
        <>
          <QueryIntent
            Detail={details.find((item) => item.type === "query_intent")}
            ChunkData={query_intent}
            getSuggestion={getSuggestion}
            loading={loadingStep?.query_intent}
          />

          <CallTools
            Detail={details.find((item) => item.type === "tools")}
            ChunkData={tools}
            loading={loadingStep?.tools}
          />

          <FetchSource
            Detail={details.find((item) => item.type === "fetch_source")}
            ChunkData={fetch_source}
            loading={loadingStep?.fetch_source}
            formatUrl={formatUrl}
          />

          <PickSource
            Detail={details.find((item) => item.type === "pick_source")}
            ChunkData={pick_source}
            loading={loadingStep?.pick_source}
          />

          <DeepRead
            Detail={details.find((item) => item.type === "deep_read")}
            ChunkData={deep_read}
            loading={loadingStep?.deep_read}
          />

          <Think
            Detail={details.find((item) => item.type === "think")}
            ChunkData={think}
            loading={loadingStep?.think}
          />

          <div className="cm-markdown">
            <Markdown
              content={messageContent || response?.message_chunk || ""}
            />
          </div>

          <PayloadCard payload={payload as any} formatUrl={formatUrl} />

          {(hasDeepResearchPlan || deepResearchReportData) && (
            <DeepResearch
              stepTitle={deepResearchStepTitle}
              query={deepResearchQuery || question}
              resultCount={deepResearchResultCount}
              progress={deepResearchProgress}
              statusText={deepResearchStatusText}
              steps={deepResearchSteps}
              plannerStatus={deepResearchPlannerStatus}
              executionStatus={deepResearchExecutionStatus}
              reportStatus={deepResearchReportStatus}
              reportData={deepResearchReportData}
              searchHits={deepResearchAllHits}
              formatUrl={formatUrl}
              theme={resolvedTheme}
            />
          )}

          {JSON.stringify(deepResearchReportData)}

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
          rootClassName,
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
  }),
);

export const ChatMessage = memo(
  forwardRef<ChatMessageRef, ChatMessageProps>((props, ref) => {
    return (
      <I18nextProvider i18n={i18nInstance}>
        <InnerChatMessage {...props} ref={ref} />
      </I18nextProvider>
    );
  }),
);
