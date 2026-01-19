import { AnimatePresence, motion } from "motion/react";
import { Button, Segmented } from "antd";
import { Download, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ResearchStepsContent } from "./ResearchStepsContent";
import type { StepItem, StepStatus, StepSearchHit } from "./ResearchStepsContent";
import {
  ResearchReportContent,
  mockResearchReportContent,
  type ResearchReportData,
} from "./ResearchReportContent";
import { ResearchSearchResultsContent } from "./ResearchSearchResultsContent";

interface DeepResearchDrawerProps {
  open: boolean;
  onClose: () => void;
  defaultActiveTab?: string;
  steps?: StepItem[];
  plannerStatus?: StepStatus;
  executionStatus?: StepStatus;
  reportStatus?: StepStatus;
  reportData?: ResearchReportData;
  searchHits?: StepSearchHit[];
}

export const DeepResearchDrawer = ({
  open,
  onClose,
  defaultActiveTab,
  steps,
  plannerStatus,
  executionStatus,
  reportStatus,
  reportData,
  searchHits,
}: DeepResearchDrawerProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || "研究步骤");

  useEffect(() => {
    setActiveTab(defaultActiveTab || "研究步骤");
  }, [defaultActiveTab]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-999 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed z-1000 top-20 bottom-20 right-4 flex flex-col rounded-xl overflow-hidden bg-white dark:bg-black shadow-[0_2px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_rgba(255,255,255,0.1)]"
            initial={{
              width: 0,
              height: 0,
              opacity: 0,
              padding: 0,
            }}
            animate={{
              width: 800,
              height: "auto",
              opacity: 1,
              padding: 24,
            }}
            exit={{
              width: 0,
              height: 0,
              opacity: 0,
              padding: 0,
            }}
          >
            <div className="flex items-center justify-between">
              <Segmented
                className="cm-deep-research-segmented"
                value={activeTab}
                style={{ marginBottom: 8 }}
                onChange={(val) => setActiveTab(val as string)}
                options={["研究报告", "研究步骤", "搜索结果"]}
              />
              <div className="flex items-center gap-2">
                {activeTab === "研究报告" && (
                  <>
                    <button
                      type="button"
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#E9F0FE] text-sm text-[#1784FC] hover:bg-[#E0E9FD] border-none outline-none cursor-pointer"
                      onClick={() => reportData?.url && window.open(reportData.url, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                      <span>下载</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#E9F0FE] text-sm text-[#1784FC] hover:bg-[#E0E9FD] border-none outline-none cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>分享</span>
                    </button>
                  </>
                )}
                <Button
                  type="text"
                  onClick={onClose}
                  className="text-[#999] hover:text-gray-600 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="pt-6 flex-1 overflow-y-auto bg-white dark:bg-black">
              {activeTab === "研究报告" && (
                <ResearchReportContent
                  content={mockResearchReportContent}
                  data={reportData}
                />
              )}
              {activeTab === "研究步骤" && (
                <ResearchStepsContent
                  steps={steps}
                  plannerStatus={plannerStatus}
                  executionStatus={executionStatus}
                  reportStatus={reportStatus}
                />
              )}
              {activeTab === "搜索结果" && (
                <ResearchSearchResultsContent hits={searchHits} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
