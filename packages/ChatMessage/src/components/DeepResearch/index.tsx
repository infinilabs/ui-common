import { useMemo, useState } from "react";
import { Loader, Hourglass, CirclePause, Check } from "lucide-react";
import { DeepResearchDrawer } from "./DeepResearchDrawer";
import type { StepItem, StepStatus, StepSearchHit } from "./ResearchStepsContent";
import type { ResearchReportData } from "./ResearchReportContent";

interface DeepResearchProps {
  stepTitle: string;
  description?: string;
  query: string;
  statusText?: string;
  resultCount?: number;
  progress?: number;
   steps?: StepItem[];
   plannerStatus?: StepStatus;
   executionStatus?: StepStatus;
   reportStatus?: StepStatus;
   reportData?: ResearchReportData;
   searchHits?: StepSearchHit[];
}

export const DeepResearch = ({
  stepTitle,
  description,
  query,
  statusText,
  resultCount,
  progress,
  steps,
  plannerStatus,
  executionStatus,
  reportStatus,
  reportData,
  searchHits,
}: DeepResearchProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerDefaultTab, setDrawerDefaultTab] = useState("研究步骤");

  const normalizedProgress = useMemo(() => {
    if (typeof progress !== "number" || Number.isNaN(progress)) return 0;
    if (progress < 0) return 0;
    if (progress > 1) return 1;
    return progress;
  }, [progress]);

  const displayStatus = useMemo(() => {
    if (statusText) return statusText;
    if (normalizedProgress >= 1) {
      if (typeof resultCount === "number") {
        return `深度研究完成 · 找到 ${resultCount} 条相关结果`;
      }
      return "深度研究完成";
    }
    if (normalizedProgress > 0) {
      return "正在执行深度研究";
    }
    return "正在准备深度研究";
  }, [statusText, normalizedProgress, resultCount]);

  return (
    <>
      <div
        className="w-full my-3 cursor-pointer"
        onClick={() => {
          setDrawerDefaultTab("研究步骤");
          setIsDrawerOpen(true);
        }}
      >
        <div className="w-full rounded-xl border border-[#EEF0F3] bg-[#F3F4F6] dark:border-[#1D3A6F] dark:bg-[#020817] p-4">
          <div className="flex items-center gap-2 mb-4">
            <Hourglass className="h-4 w-4 text-[#148EFF] cm-hourglass-rotate" />
            <div className="text-sm font-medium text-[#333] dark:text-[#E5E7EB]">
              {stepTitle}
            </div>
          </div>

          {description ? (
            <div className="text-sm text-[#999] dark:text-[#A6A6A6]">
              {description}
            </div>
          ) : null}

          <div className="mt-2 flex items-center justify-between rounded-full bg-white px-3 py-2 text-sm text-[#333] dark:bg-[#111827] dark:text-[#D1D5DB]">
            <div className="flex min-w-0 items-center gap-2">
              {normalizedProgress >= 1 ? (
                <Check className="h-3 w-3 text-[#22C55E]" />
              ) : (
                <Loader className="h-3 w-3 animate-spin text-[#148EFF]" />
              )}
              <span className="">
                {displayStatus}
                <span className="truncate text-[#999] dark:text-[#A6A6A6]">
                  ｜ {query}
                </span>
              </span>
            </div>
            <div className="ml-2 flex items-center gap-2">
              {normalizedProgress < 1 && typeof resultCount === "number" ? (
                <div className="flex py-0.5 px-1 items-center justify-center rounded-full border border-[#018AE5] bg-white text-xs font-medium text-[#018AE5] dark:bg-[#020617]">
                  {resultCount}
                </div>
              ) : null}
              {normalizedProgress >= 1 && (
                <button
                  type="button"
                  className="px-3 py-1 text-xs font-medium rounded-full bg-[#E9F0FE] text-[#1784FC] hover:bg-[#E0E9FD] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDrawerDefaultTab("研究报告");
                    setIsDrawerOpen(true);
                  }}
                >
                  查看
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 w-full flex items-center gap-2 overflow-hidden">
            <div className="h-2 rounded-full flex-1 items-center bg-white dark:bg-[#1F2937]">
              <div
                className={`h-full rounded-full transition-all ${
                  normalizedProgress >= 1 ? "bg-[#00C868]" : "bg-[#1784FC]"
                }`}
                style={{ width: `${normalizedProgress * 100}%` }}
              />
            </div>
            <div 
              className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
            >
              {normalizedProgress >= 1 ? (
                <Check className="h-4 w-4 text-[#22C55E]" />
              ) : (
                <CirclePause className="h-4 w-4 text-[#1784FC]" />
              )}
            </div>
          </div>
        </div>
      </div>
      <DeepResearchDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        defaultActiveTab={drawerDefaultTab}
        steps={steps}
        plannerStatus={plannerStatus}
        executionStatus={executionStatus}
        reportStatus={reportStatus}
        reportData={reportData}
        searchHits={searchHits}
      />
    </>
  );
};
