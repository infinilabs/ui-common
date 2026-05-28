import i18n, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      history_list: {
        search: {
          placeholder: "Search history...",
        },
        date: {
          today: "Today",
          yesterday: "Yesterday",
          last7Days: "Previous 7 Days",
          last30Days: "Previous 30 Days",
        },
        menu: {
          rename: "Rename",
          delete: "Delete",
        },
        delete_modal: {
          title: "Delete Chat",
          description: "Are you sure you want to delete '{{item}}'?",
          button: {
            cancel: "Cancel",
            delete: "Delete",
          },
        },
        operate: {
          rename_success: "Rename successful",
          rename_error: "Rename failed",
          renaming: "Renaming...",
          delete_success: "Delete successful",
          delete_error: "Delete failed",
          deleting: "Deleting...",
        },
      },
      assistant_list: {
        default_name: "Assistant",
        title: "Assistants",
        search: {
          placeholder: "Search assistant",
        },
        no_data: "No data",
      },
      assistant: {
        chat: {
          greetings: "Hello! How can I help you today?",
          timedout: "Request timed out. Please try again.",
        },
      },
      app: {
        input: {
          placeholder: "Ask whatever you want...",
        },
        disclaimer: "AI generated content may be inaccurate.",
        new_chat: "New Chat",
        logo: {
          chat: "Chat",
        },
      },
      search: {
        input: {
          attachment: "Attachment",
          attachment_remove: "Remove",
          attachment_upload_failed: "Upload failed",
          voice: "Voice",
          send: "Send",
          stop: "Stop",
          deepThink: "DeepThink",
          deepResearch: "DeepResearch",
          search: "Search",
          MCP: "MCP",
          searchPopover: {
            title: "Select",
            placeholder: "Search...",
            allScope: "All Scope",
          },
        },
        textarea: {
          placeholder: "Ask whatever you want...",
          ariaLabel: "Chat Input",
        },
      },
    },
  },
  "zh-CN": {
    translation: {
      history_list: {
        search: {
          placeholder: "搜索历史记录...",
        },
        date: {
          today: "今天",
          yesterday: "昨天",
          last7Days: "过去 7 天",
          last30Days: "过去 30 天",
        },
        menu: {
          rename: "重命名",
          delete: "删除",
        },
        delete_modal: {
          title: "删除对话",
          description: "确定要删除 '{{item}}' 吗？",
          button: {
            cancel: "取消",
            delete: "删除",
          },
        },
        operate: {
          rename_success: "重命名成功",
          rename_error: "重命名失败",
          renaming: "正在重命名...",
          delete_success: "删除成功",
          delete_error: "删除失败",
          deleting: "正在删除...",
        },
      },
      assistant_list: {
        default_name: "助手",
        title: "助手列表",
        search: {
          placeholder: "搜索助手",
        },
        no_data: "暂无数据",
      },
      assistant: {
        chat: {
          greetings: "你好！今天有什么可以帮你的吗？",
          timedout: "请求超时，请重试。",
        },
      },
      app: {
        input: {
          placeholder: "问点什么...",
        },
        disclaimer: "AI 生成的内容可能不准确。",
        new_chat: "新对话",
        logo: {
          chat: "对话",
        },
      },
      search: {
        input: {
          attachment: "附件",
          attachment_remove: "移除",
          attachment_upload_failed: "上传失败",
          voice: "语音",
          send: "发送",
          stop: "停止",
          deepThink: "深度思考",
          deepResearch: "深度研究",
          search: "联网搜索",
          MCP: "MCP",
          searchPopover: {
            title: "选择",
            placeholder: "搜索...",
            allScope: "全部范围",
          },
        },
        textarea: {
          placeholder: "问点什么...",
          ariaLabel: "聊天输入",
        },
      },
    },
  },
};

const i18nInstance: I18n = i18n.createInstance();

i18nInstance.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18nInstance;
