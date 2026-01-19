import { XMarkdown } from "@ant-design/x-markdown";
import { FileText, Download } from "lucide-react";

export interface ResearchReportData {
  title?: string;
  url?: string;
  created?: string;
  attachment?: string;
}

export const mockResearchReportContent = `# What is coco ai

## 摘要

本研究报告对 Coco AI 相关的系统与能力进行了调研和分析，对其产品定位、技术特点、应用场景以及市场竞争力进行了系统性梳理。

## 目录

1. [Coco AI 概述与基本定义]
2. [Coco AI 核心技术与功能特性]
3. [市场竞争分析与差异化优势]
4. [应用场景与实际使用案例]
5. [发展历程与版本演进]
6. [发展前景与趋势展望]

## Coco AI 概述与基本定义

### 1.1 产品定位与核心概念

Coco AI 是面向企业级知识检索与智能问答场景打造的智能搜索系统，专注于通过自然语言交互帮助用户在复杂的信息系统中高效获取答案。

该产品定位为企业级智能数据搜索与知识解决方案，目标是提升信息检索效率、降低知识获取门槛，并通过智能推荐与语义理解能力，提升整体决策质量。

### 1.2 技术特征与功能属性

#### 1.2.1 智能检索能力

Coco AI 依托语义理解和大模型相关技术，支持对非结构化文本、半结构化内容以及多源异构数据进行统一检索与聚合，提供多维度、可追溯的检索结果。`;

interface ResearchReportContentProps {
  content?: string;
  data?: ResearchReportData;
}

export const ResearchReportContent = ({ content, data }: ResearchReportContentProps) => {
  if (!content && !data) {
    return (
      <div className="px-6 pb-8 max-w-[730px] h-full flex flex-col items-center justify-center text-center">
        <div className="mb-2 text-base font-medium text-[#333333]">
          研究报告生成中
        </div>
        <div className="text-sm text-[#999999] max-w-[520px] leading-relaxed">
          我正在根据你的问题执行完整的研究流程，整理结构化的研究报告。研究完成后，报告会自动展示在这里。
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 pb-8 max-w-[730px]">
      {data && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {data.title || "Research Report"}
              </div>
              <div className="text-xs text-gray-500">
                {data.created ? new Date(data.created).toLocaleString() : ""}
              </div>
            </div>
          </div>
          {data.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
      {content && (
        <div className="cm-markdown">
          <XMarkdown content={content} />
        </div>
      )}
    </div>
  );
};
