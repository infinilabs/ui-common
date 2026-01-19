import {
  CheckCircle,
  Loader,
  Search,
  FileText,
  ChevronDown,
  PencilLine,
  BookOpenText,
  List,
  ChevronUp,
} from "lucide-react";
import { deepResearchMockChunks } from "../data";
import { useState } from "react";

export type StepStatus = "done" | "in_progress" | "pending";

export type StepSearchStatus = "done" | "searching";

export interface StepSearchHit {
  source?: string;
  title: string;
  url?: string;
  content?: string;
  score?: number;
}

export interface StepSearch {
  id: string;
  query: string;
  resultCount?: number;
  status: StepSearchStatus;
  note?: string;
  hits?: StepSearchHit[];
}

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
  searches?: StepSearch[];
  showOptimizePlan?: boolean;
}

const mockSteps: StepItem[] = (() => {
  const plannerChunk = deepResearchMockChunks.find(
    (chunk) => chunk.chunk_type === "research_planner_end"
  );

  let plans: string[] = [];

  if (plannerChunk && typeof plannerChunk.message_chunk === "string") {
    try {
      const payload = JSON.parse(plannerChunk.message_chunk);
      if (Array.isArray(payload)) {
        plans = payload.map((item) => String(item));
      }
    } catch (error) {
      console.error(error);
      plans = [];
    }
  }

  const searchMap = new Map<
    string,
    {
      query?: string;
      resultCount?: number;
      hits?: StepSearchHit[];
    }
  >();

  for (const chunk of deepResearchMockChunks) {
    if (
      chunk.chunk_type === "research_researcher_step_start" &&
      typeof chunk.message_chunk === "string" &&
      chunk.message_chunk
    ) {
      try {
        const payload = JSON.parse(chunk.message_chunk);
        const plan =
          typeof payload?.plan === "string" ? payload.plan : "";
        const query =
          typeof payload?.step?.payload?.query === "string"
            ? payload.step.payload.query
            : undefined;
        if (plan) {
          const existing = searchMap.get(plan) ?? {};
          if (query) {
            existing.query = query;
          }
          searchMap.set(plan, existing);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      chunk.chunk_type === "research_researcher_step_end" &&
      typeof chunk.message_chunk === "string" &&
      chunk.message_chunk
    ) {
      try {
        const payload = JSON.parse(chunk.message_chunk);
        const plan =
          typeof payload?.plan === "string" ? payload.plan : "";
        const hits = Array.isArray(payload?.step?.payload?.hits)
          ? payload.step.payload.hits
          : undefined;
        if (plan) {
          const existing = searchMap.get(plan) ?? {};
          if (hits) {
            existing.resultCount = hits.length;
            existing.hits = hits;
          }
          searchMap.set(plan, existing);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (!plans.length) {
    return [];
  }

  return plans.map((plan, index) => {
    const searchInfo = searchMap.get(plan);
    const searches = searchInfo?.query
      ? [
          {
            id: `step-${index + 1}-search-1`,
            query: searchInfo.query,
            resultCount: searchInfo.resultCount,
            status: "done" as StepSearchStatus,
            hits: searchInfo.hits,
          },
        ]
      : undefined;

    return {
      id: `step-${index + 1}`,
      title: plan,
      status: "done" as StepStatus,
      searches,
      showOptimizePlan: index === 0,
    };
  });
})();

interface ResearchStepsContentProps {
  steps?: StepItem[];
  plannerStatus?: StepStatus;
  executionStatus?: StepStatus;
  reportStatus?: StepStatus;
}

export const ResearchStepsContent = ({
  steps,
  plannerStatus,
  executionStatus,
  reportStatus,
}: ResearchStepsContentProps) => {
  const data = steps && steps.length ? steps : mockSteps;
  const [expandedSearches, setExpandedSearches] = useState<Set<string>>(new Set());

  const toggleSearch = (searchId: string) => {
    setExpandedSearches((prev) => {
      const next = new Set(prev);
      if (next.has(searchId)) {
        next.delete(searchId);
      } else {
        next.add(searchId);
      }
      return next;
    });
  };

  const firstActiveIndex = data.findIndex((step) => step.status !== "pending");

  const lastActiveIndex = data.reduce(
    (lastIndex, step, index) => (step.status !== "pending" ? index : lastIndex),
    -1
  );

  const autoExecutionStatus: StepStatus = (() => {
    if (!data.length) return "pending";
    if (data.some((step) => step.status === "in_progress")) {
      return "in_progress";
    }
    if (data.some((step) => step.status === "done")) {
      return "done";
    }
    return "pending";
  })();

  const planner = plannerStatus ?? (data.length ? "done" : "pending");
  const execution = executionStatus ?? autoExecutionStatus;
  const report = reportStatus ?? "pending";

  return (
    <div className="space-y-6 pr-6">
      <div className="text-sm text-[#333] dark:text-[#E5E7EB]">
        将为你整理关于“Coco
        AI”的相关信息，包括其定义、用途、市场情况以及与之相关的常见问题。如果是指特定领域的“Coco
        AI”，我还会进一步深入研究其在该领域的具体应用和影响。完成后我会向你汇报结果。
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-center gap-2 text-base font-medium ${
            planner === "pending" ? "text-[#999] dark:text-[#666]" : "text-[#333] dark:text-[#E5E7EB]"
          }`}
        >
          <PencilLine className="w-4 h-4 text-[#1784FC]" />
          规划研究计划
        </div>
        <div className=" text-[#999] dark:text-[#A6A6A6] text-sm mb-2">
          我正在针对 Coco AI，进行规划研究计划
        </div>

        <div className="border border-[#EEF0F3] dark:border-[#1D3A6F] rounded-lg p-3 bg-white dark:bg-[#020817] flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#111827] transition-colors">
          <div className="flex items-center gap-2 text-sm text-[#333] dark:text-[#E5E7EB]">
            <List className="w-4 h-4 text-[#1784FC]" />
            生成的计划
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="pt-2">
        <div
          className={`flex items-center gap-2 text-base font-medium mb-4 ${
            execution === "pending" ? "text-[#999] dark:text-[#666]" : "text-[#333] dark:text-[#E5E7EB]"
          }`}
        >
          <List className="w-4 h-4 text-[#1784FC]" />
          执行研究计划
        </div>

        {data.map((step, index) => {
          const isActive = step.status !== "pending";
          const isFirstActive = index === firstActiveIndex;
          const isLastActive = index === lastActiveIndex;

          const isSimplePending = step.status === "pending" && !step.searches;

          return (
            <div
              key={step.id}
              className={`relative ${
                isSimplePending ? "pl-0 pb-4" : "pl-6 pb-8 last:pb-0"
              }`}
            >
              {isActive &&
                firstActiveIndex !== -1 &&
                lastActiveIndex !== -1 && (
                  <div
                    className="absolute left-2.5 border-l border-dashed border-gray-200 dark:border-gray-700"
                    style={{
                      top: isFirstActive ? 10 : 0,
                      bottom: isLastActive ? 10 : 0,
                    }}
                  />
                )}

              {step.status === "done" && (
                <div className="absolute left-0 top-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}

              {step.status === "in_progress" && (
                <div className="absolute left-0 top-0 w-5 h-5 bg-white dark:bg-[#020817] border-2 border-blue-500 rounded-full flex items-center justify-center">
                  <Loader className="w-3 h-3 text-blue-500 animate-spin" />
                </div>
              )}

              {isSimplePending ? (
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 text-[#C8C8C8]" />
                  <div className="text-sm text-[#999999] dark:text-[#666]">{step.title}</div>
                </div>
              ) : (
                <>
                  <h3
                    className={`text-sm font-bold mb-1 ${
                      step.status === "pending"
                        ? "text-[#999999] dark:text-[#666]"
                        : "text-[#333333] dark:text-[#E5E7EB]"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {step.description && (
                    <p className="text-[#999] dark:text-[#A6A6A6] text-sm mt-4 mb-2">
                      {step.description}
                    </p>
                  )}

                  {step.searches && (
                    <div className="space-y-3">
                      {step.searches.map((search) =>
                        search.status === "searching" ? (
                          <div
                            key={search.id}
                            className="flex items-center justify-between border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                              <Search className="w-4 h-4 text-[#1784FC] animate-pulse" />
                              <span className="text-[#333] dark:text-[#E5E7EB]">正在搜索</span>
                              <span className="text-[#999] dark:text-[#A6A6A6]">
                                ｜ {search.query}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div key={search.id}>
                            <div 
                              className="flex items-center justify-between border border-gray-200 dark:border-[#1D3A6F] rounded-lg p-3 bg-gray-50 dark:bg-[#111827] cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1F2937] transition-colors"
                              onClick={() => toggleSearch(search.id)}
                            >
                              <div className="flex items-center gap-2 text-sm">
                                <Search className="w-4 h-4 text-[#1784FC]" />
                                <span className="text-[#333] dark:text-[#E5E7EB]">搜索资料</span>
                                <span className="text-[#999] dark:text-[#A6A6A6]">
                                  ｜ {search.query}
                                </span>
                              </div>
                              {typeof search.resultCount === "number" && (
                                <div className="flex items-center gap-1">
                                  <div className="bg-blue-50 dark:bg-blue-900/20 text-[#1784FC] px-2 py-0.5 rounded-full text-xs font-medium">
                                    {search.resultCount}
                                  </div>
                                  {expandedSearches.has(search.id) ? (
                                    <ChevronUp className="w-4 h-4 text-[#999]" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-[#999]" />
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {expandedSearches.has(search.id) && search.hits && (
                              <div className="mt-2 space-y-2 pl-4">
                                {search.hits.map((hit, idx) => (
                                  <div 
                                    key={idx} 
                                    className="p-3 bg-white dark:bg-[#020817] border border-gray-100 dark:border-[#1D3A6F] rounded-lg hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer group"
                                    onClick={() => hit.url && window.open(hit.url, '_blank')}
                                  >
                                    <div className="flex items-start gap-2">
                                      <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium text-[#333] dark:text-[#E5E7EB] group-hover:text-[#1784FC] transition-colors line-clamp-1">
                                          {hit.title}
                                        </div>
                                        {hit.content && (
                                          <div className="text-xs text-[#999] dark:text-[#A6A6A6] mt-1 line-clamp-2">
                                            {hit.content}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {search.note && (
                              <p className="text-[#999] dark:text-[#A6A6A6] text-sm mt-4 mb-2">
                                {search.note}
                              </p>
                            )}
                          </div>
                        )
                      )}

                      {step.showOptimizePlan && (
                        <div className="border border-gray-200 dark:border-[#1D3A6F] rounded-lg p-3 bg-white dark:bg-[#020817] flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#111827] transition-colors">
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-[#1784FC]" />
                            <span className="text-[#333] dark:text-[#E5E7EB]">优化研究计划</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-[#999]" />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        <div className="pt-2">
          <div
            className={`flex items-center gap-2 text-base font-medium mb-4 ${
              report === "pending" ? "text-[#999] dark:text-[#666]" : "text-[#333] dark:text-[#E5E7EB]"
            }`}
          >
            <BookOpenText
              className={`w-4 h-4 ${
                report === "pending" ? "text-[#999]" : "text-[#1784FC]"
              }`}
            />
            编写研究报告
          </div>
        </div>
      </div>
    </div>
  );
};
