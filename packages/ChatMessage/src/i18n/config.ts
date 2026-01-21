import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      assistant: {
        message: {
          logo: "Coco AI Logo",
          aiName: "Coco AI",
          thinkingButton: "View thinking process",
          steps: {
            query_intent: "Understand the query",
            tools: "Call LLM Tools",
            source_zero: "Searching for relevant documents",
            fetch_source: "Retrieve {{count}} documents",
            pick_source: "Intelligent pick {{count}} results",
            pick_source_start: "Intelligently pre-selecting",
            deep_read: "Deep reading",
            think: "AI is thinking...",
            thoughtTime: "Thought for a few seconds",
            keywords: "Keywords",
            questionType: "Query Type",
            userIntent: "User Intent",
            relatedQuestions: "Query",
            suggestion: "Suggestion",
            informationSeeking: "Information Seeking",
          },
        },
      },
      deepResearch: {
        status: {
          completedWithCount:
            "Deep research completed · Found {{count}} related results",
          completed: "Deep research completed",
          running: "Deep research in progress",
          preparing: "Preparing deep research",
        },
        button: {
          view: "View",
          download: "Download",
          share: "Share",
        },
        tab: {
          report: "Research Report",
          steps: "Research Steps",
          searchResults: "Search Results",
        },
        report: {
          generatingTitle: "Generating research report",
          generatingDescription:
            "Running a complete research workflow based on your question and compiling a structured report. It will appear here once ready.",
          defaultTitle: "Research Report",
        },
        steps: {
          intro:
            "I will collect and analyze information related to this topic, including its definition, use cases, market landscape and common questions. If it refers to a specific domain, I will further study its concrete applications and impact in that domain, and then report the results to you.",
          planTitle: "Plan research steps",
          planDescription: "I am planning a research workflow around this topic.",
          generatedPlans: "Generated plans",
          executeTitle: "Execute research plans",
          searching: "Searching",
          searchTitle: "Search sources",
          optimizePlan: "Optimize research plan",
          reportTitle: "Generate research report",
        },
      },
      sessionFiles: {
        labels: {
          all: "All",
        },
        modal: {
          title: "Files in the conversation",
          description:
            "Only the selected files will participate in the current conversation.",
        },
      },
    },
  },
  zh: {
    translation: {
      assistant: {
        message: {
          logo: "Coco AI 图标",
          aiName: "Coco AI",
          thinkingButton: "查看思考过程",
          steps: {
            query_intent: "理解查询",
            tools: "调用大模型工具",
            source_zero: "正在搜索相关文档",
            fetch_source: "检索 {{count}} 份文档",
            pick_source: "智能预选 {{count}} 个结果",
            pick_source_start: "正在智能预选",
            deep_read: "深度阅读",
            think: "AI 正在思考...",
            thoughtTime: "思考了数秒",
            keywords: "关键词",
            questionType: "查询类型",
            userIntent: "用户意图",
            relatedQuestions: "查询",
            suggestion: "建议",
            informationSeeking: "信息查询",
          },
        },
      },
      deepResearch: {
        status: {
          completedWithCount: "深度研究完成 · 找到 {{count}} 条相关结果",
          completed: "深度研究完成",
          running: "正在执行深度研究",
          preparing: "正在准备深度研究",
        },
        button: {
          view: "查看",
          download: "下载",
          share: "分享",
        },
        tab: {
          report: "研究报告",
          steps: "研究步骤",
          searchResults: "搜索结果",
        },
        report: {
          generatingTitle: "研究报告生成中",
          generatingDescription:
            "我正在根据你的问题执行完整的研究流程，整理结构化的研究报告。研究完成后，报告会自动展示在这里。",
          defaultTitle: "研究报告",
        },
        steps: {
          intro:
            "将为你整理与该主题相关的信息，包括其定义、用途、市场情况以及常见问题。如果是指特定领域的主题，我还会进一步深入研究其在该领域的具体应用和影响。完成后我会向你汇报结果。",
          planTitle: "规划研究计划",
          planDescription: "我正在针对该主题，进行规划研究计划",
          generatedPlans: "生成的计划",
          executeTitle: "执行研究计划",
          searching: "正在搜索",
          searchTitle: "搜索资料",
          optimizePlan: "优化研究计划",
          reportTitle: "生成研究报告",
        },
      },
      sessionFiles: {
        labels: {
          all: "全部",
        },
        modal: {
          title: "会话中的文件",
          description: "只有选定的文件才会参与当前会话。",
        },
      },
    },
  },
};

const i18nInstance = i18n.createInstance();

i18nInstance.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18nInstance;
