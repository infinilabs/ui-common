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
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const data = steps ?? [];
  const [expandedSearches, setExpandedSearches] = useState<Set<string>>(new Set());
  const [plansExpanded, setPlansExpanded] = useState(false);

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
        {t("deepResearch.steps.intro")}
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-center gap-2 text-base font-medium ${
            planner === "pending" ? "text-[#999] dark:text-[#666]" : "text-[#333] dark:text-[#E5E7EB]"
          }`}
        >
          <PencilLine className="w-4 h-4 text-[#1784FC]" />
          {t("deepResearch.steps.planTitle")}
        </div>
        <div className=" text-[#999] dark:text-[#A6A6A6] text-sm mb-2">
          {t("deepResearch.steps.planDescription")}
        </div>

        <div
          className="border border-[#EEF0F3] dark:border-[#1D3A6F] rounded-lg p-3 bg-white dark:bg-[#020817] flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#111827] transition-colors"
          onClick={() => setPlansExpanded((prev) => !prev)}
        >
          <div className="flex items-center gap-2 text-sm text-[#333] dark:text-[#E5E7EB]">
            <List className="w-4 h-4 text-[#1784FC]" />
            {t("deepResearch.steps.generatedPlans")}
          </div>
          {plansExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {plansExpanded && data.length > 0 && (
          <div className="mt-2 space-y-1 rounded-lg bg-white dark:bg-[#020817] border border-[#EEF0F3] dark:border-[#1D3A6F] p-3">
            {data.map((step, index) => (
              <div key={step.id} className="flex items-start gap-2 text-sm">
                <span className="text-[#999] dark:text-[#A6A6A6]">{index + 1}.</span>
                <span className="text-[#333] dark:text-[#E5E7EB]">{step.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <div
          className={`flex items-center gap-2 text-base font-medium mb-4 ${
            execution === "pending" ? "text-[#999] dark:text-[#666]" : "text-[#333] dark:text-[#E5E7EB]"
          }`}
        >
          <List className="w-4 h-4 text-[#1784FC]" />
          {t("deepResearch.steps.executeTitle")}
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
                    <p className="text-[#999] dark:text-[#A6A6A6] text-sm mt-4">
                      {step.description}
                    </p>
                  )}

                  {step.searches && (
                    <div className="mt-2 space-y-3">
                      {step.searches.map((search) =>
                        search.status === "searching" ? (
                          <div
                            key={search.id}
                            className="flex items-center justify-between border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10 rounded-lg p-3"
                          >
                            <div className="flex items-center gap-2 text-sm overflow-hidden">
                              <Search className="w-4 h-4 text-[#1784FC] animate-pulse shrink-0" />
                              <span className="text-[#333] dark:text-[#E5E7EB] shrink-0">
                                {t("deepResearch.steps.searching")}
                              </span>
                              <span className="text-[#999] dark:text-[#A6A6A6] truncate">
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
                              <div className="flex items-center gap-2 text-sm overflow-hidden">
                                <Search className="w-4 h-4 text-[#1784FC] shrink-0" />
                                <span className="text-[#333] dark:text-[#E5E7EB] shrink-0">
                                  {t("deepResearch.steps.searchTitle")}
                                </span>
                                <span className="text-[#999] dark:text-[#A6A6A6] truncate">
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
                            <span className="text-[#333] dark:text-[#E5E7EB]">
                              {t("deepResearch.steps.optimizePlan")}
                            </span>
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
            {t("deepResearch.steps.reportTitle")}
          </div>
        </div>
      </div>
    </div>
  );
};
