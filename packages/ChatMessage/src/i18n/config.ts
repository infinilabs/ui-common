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
