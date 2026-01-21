import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import { type ChatMessageRef } from "@infinilabs/chat-message";

import i18n from "../i18n";
import { useChatStore } from "../stores/chatStore";
import { ChatContent } from "./ChatContent";
import type { Chat, ChatMessageItem, IChunkData } from "../types/chat";
import { streamPost } from "../api/streamFetch";
import { Get, Post } from "../api/axiosRequest";
import { useIconfontScript } from "../hooks/useScript";

/**
 * ChatAI 组件接口定义
 * @property BaseUrl - API 基础地址
 * @property Token - 认证 Token (可选)
 * @property formatUrl - 自定义 URL 格式化函数 (可选)
 * @property locale - 语言环境 (可选)
 * @property t - 国际化翻译函数 (可选)
 */
interface ChatAIProps {
  BaseUrl: string;
  Token?: string;
  formatUrl?: (data: IChunkData) => string;
  locale?: string;
  t?: TFunction;
}

/**
 * 发送消息参数接口
 * @property message - 消息内容
 * @property attachments - 附件列表 (ID 数组)
 * @property search - 是否启用搜索
 * @property deep_thinking - 是否启用深度思考
 * @property mcp - 是否启用 MCP
 * @property datasource - 数据源
 * @property mcp_servers - MCP 服务器配置
 * @property assistant_id - 助手 ID
 */
export interface SendMessageParams {
  message?: string;
  attachments?: string[];
  search?: boolean;
  deep_thinking?: boolean;
  mcp?: boolean;
  datasource?: string;
  mcp_servers?: string;
  assistant_id?: string;
}

/**
 * ChatAI 组件对外暴露的引用接口
 * @property init - 初始化并发送消息
 * @property cancelChat - 取消当前对话生成
 * @property clearChat - 清除当前对话状态
 * @property onSelectChat - 切换当前选中的对话
 */
export interface ChatAIRef {
  init: (params: SendMessageParams) => void;
  cancelChat: () => void;
  clearChat: () => void;
  onSelectChat: (chat: Chat) => void;
}

/**
 * 内部 ChatAI 组件实现
 * 处理核心聊天逻辑、状态管理和消息流式传输
 */
const InnerChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>(
    ({ BaseUrl, formatUrl, t: tProp }, ref) => {
      // 动态加载 iconfont 脚本
      useIconfontScript();

      const { t: tOriginal } = useTranslation();
      const t = tProp || tOriginal;
      const baseUrl = BaseUrl;

      // 从全局 Store 获取聊天状态
      const curChatEnd = useChatStore((state) => state.curChatEnd); // 当前对话是否结束
      const setCurChatEnd = useChatStore((state) => state.setCurChatEnd);
      const activeChat = useChatStore((state) => state.activeChat); // 当前选中的对话
      const setActiveChat = useChatStore((state) => state.setActiveChat);
      const currentAssistant = useChatStore((state) => state.currentAssistant); // 当前助手信息

      // 本地状态
      const [timedoutShow, setTimedoutShow] = useState(false); // 超时提示显示状态
      const [Question, setQuestion] = useState<string>(""); // 当前正在处理的问题文本

      // Refs 用于在闭包和异步操作中保持最新值
      const curIdRef = useRef(""); // 当前生成的消息 ID
      const curSessionIdRef = useRef(""); // 当前会话 ID
      const activeMessageRef = useRef<ChatMessageRef>(null); // 活跃消息组件的引用

      type ChatStreamSingle = {
        _id?: string;
        _source?: {
          [key: string]: unknown;
        };
        payload?: {
          id?: string;
          session_id?: string;
          [key: string]: unknown;
        };
      };

      /**
       * 处理流式消息回调
       * 负责解析服务端返回的数据流，更新消息列表或处理流式 chunks
       */
      const handleStreamMessage = useCallback(
        (msg: string) => {
          try {
            // Attempt to parse the message, as it might be a JSON string
            if (msg.startsWith("{") && msg.endsWith("}")) {
              //
            }

            // 逻辑分支 1: 处理历史记录或完整消息更新
            // 通过检查消息中是否包含特定关键字来判断是否为历史记录或用户消息回执
            if (
              msg.includes('"user"') &&
              msg.includes("_source") &&
              msg.includes("result")
            ) {
              // ... (现有的解析逻辑)
              const parsed = JSON.parse(msg) as
                | ChatMessageItem[]
                | ChatStreamSingle;
              // ... (其余的现有逻辑)
              let nextChat: Chat;

              if (Array.isArray(parsed)) {
                // 情况 A: 收到消息数组（通常是加载历史记录）
                const hits = parsed as ChatMessageItem[];
                const first = hits[0];
                if (first) {
                  // 更新当前消息 ID 和会话 ID
                  curIdRef.current = first._id;
                  const source = first._source as { [key: string]: unknown };
                  const sessionId = source.session_id as string | undefined;
                  if (sessionId) {
                    curSessionIdRef.current = sessionId;
                  }
                }
                // 获取当前活动聊天对象或创建一个新的基础对象
                const baseChat: Chat = activeChat || {
                  _id: first?._id ?? "",
                };
                // 合并新消息到消息列表中
                nextChat = {
                  ...baseChat,
                  messages: [...(baseChat.messages || []), ...hits],
                };
              } else {
                // 情况 B: 收到单个消息对象（通常是新发送的用户消息回执）
                const withPayload = parsed as ChatStreamSingle;
                const payload = withPayload.payload ?? {};
                const id = payload.id;
                const sessionId = payload.session_id;

                // 更新当前消息 ID 和会话 ID
                if (typeof id === "string") {
                  curIdRef.current = id;
                }
                if (typeof sessionId === "string") {
                  curSessionIdRef.current = sessionId;
                }

                // 构造标准消息项对象
                const messageItem: ChatMessageItem = {
                  _id:
                    withPayload._id ??
                    (typeof id === "string" ? id : "") ??
                    activeChat?._id ??
                    "",
                  _source: {
                    ...(withPayload._source || {}),
                    ...payload,
                  } as ChatMessageItem["_source"],
                };

                // 获取当前活动聊天对象或创建一个新的基础对象
                const baseChat: Chat = activeChat || {
                  _id: messageItem._id,
                };

                // 将新消息追加到消息列表中
                nextChat = {
                  ...baseChat,
                  messages: [...(baseChat.messages || []), messageItem],
                };
              }

              // 更新全局活动聊天状态，触发 UI 重绘
              console.log("setActiveChat3", nextChat);
              setActiveChat(nextChat);
            }

            // 逻辑分支 2: 处理流式 Chunks (打字机效果、思考过程等)
            const chunkData = JSON.parse(msg);

            if (chunkData.chunk_type) {
              // 标记回复开始
              if (chunkData.chunk_type === "reply_start") {
                setCurChatEnd(false);
              }

              // 将 chunk 数据传递给活跃的消息组件进行展示
              activeMessageRef.current?.addChunk(chunkData);

              // 标记回复结束
              if (chunkData.chunk_type === "reply_end") {
                setCurChatEnd(true);
              }
            }
          } catch (error) {
            // JSON 解析失败或其他错误处理
            console.error("Failed to parse chat message:", error);
          }
        },
        [activeChat, setActiveChat, setCurChatEnd],
      );

      /**
       * 准备新的聊天会话
       * 重置当前消息状态，为新一轮问答做准备
       */
      const prepareChatSession = useCallback(async (value: string) => {
        activeMessageRef.current?.reset(); // 重置活跃消息组件状态
        setTimedoutShow(false);
        setQuestion(value); // 设置当前问题文本
      }, []);

      /**
       * 拉取指定会话的历史记录
       * @param chatId - 会话 ID
       */
      const fetchHistory = useCallback(
        async (chatId: string) => {
          try {
            const [err, res] = await Get<{
              hits: { hits: ChatMessageItem[] };
            }>(`/chat/${chatId}/_history`, {
              from: 0,
              size: 1000,
            });
            if (err || !res) return;
            const hits = (res?.hits?.hits ?? []) as ChatMessageItem[];

            // 获取最新状态以确保我们在更新正确的聊天
            const currentActive = useChatStore.getState().activeChat;
            if (currentActive?._id === chatId) {
              console.log("setActiveChat4", {
                ...currentActive,
                messages: hits,
              });
              setActiveChat({
                ...currentActive,
                messages: hits,
              });
            }
          } catch (e) {
            console.error(e);
          }
        },
        [setActiveChat],
      );

      /**
       * 创建新会话并发送第一条消息
       */
      const createNewChat = useCallback(
        async (params: SendMessageParams) => {
          const text = params.message ?? "";
          const attachments = params.attachments;
          // 如果没有文本且没有附件，则不发送
          if (!text && (!attachments || attachments.length === 0)) {
            return;
          }
          await prepareChatSession(text);

          // 构建查询参数，包含助手配置
          const queryParams = {
            search:
              params.search ??
              !!(currentAssistant?._source?.deep_research_enabled ?? true),
            deep_thinking:
              params.deep_thinking ??
              !!(currentAssistant?._source?.deep_think_enabled ?? true),
            mcp: params.mcp,
            datasource: params.datasource,
            mcp_servers: params.mcp_servers,
            assistant_id: params.assistant_id || currentAssistant?._id || "",
          };

          // 发送创建会话请求
          await streamPost({
            url: "/chat/_create",
            body: {
              message: text,
              attachments,
            },
            queryParams,
            onMessage: handleStreamMessage,
          });
        },
        [handleStreamMessage, prepareChatSession, currentAssistant],
      );

      /**
       * 在现有会话中发送消息
       */
      const sendMessage = useCallback(
        async (chat: Chat, params?: SendMessageParams) => {
          if (!chat?._id || !params) return;
          const text = params.message ?? "";
          const attachments = params.attachments;
          if (!text && (!attachments || attachments.length === 0)) {
            return;
          }
          await prepareChatSession(text);

          // 发送前先刷新历史记录（确保上下文最新）
          await fetchHistory(chat._id);

          const queryParams = {
            search:
              params.search ??
              !!(currentAssistant?._source?.deep_research_enabled ?? true),
            deep_thinking:
              params.deep_thinking ??
              !!(currentAssistant?._source?.deep_think_enabled ?? true),
            mcp: params.mcp,
            datasource: params.datasource,
            mcp_servers: params.mcp_servers,
            assistant_id: params.assistant_id || currentAssistant?._id || "",
          };

          // 发送聊天消息请求
          await streamPost({
            url: `/chat/${chat._id}/_chat`,
            body: { message: text, attachments },
            queryParams,
            onMessage: handleStreamMessage,
          });
        },
        [
          prepareChatSession,
          fetchHistory,
          currentAssistant?._source?.deep_research_enabled,
          currentAssistant?._source?.deep_think_enabled,
          currentAssistant?._id,
          handleStreamMessage,
        ],
      );

      /**
       * 处理发送消息的统一入口
       * 根据是否存在 activeChat 决定是创建新会话还是追加消息
       */
      const handleSendMessage = useCallback(
        async (chat?: Chat, params?: SendMessageParams) => {
          if (!curChatEnd) return; // 如果当前正在生成中，阻止发送
          if (!chat?._id) {
            await createNewChat(params || {});
          } else {
            await sendMessage(chat, params);
          }
        },
        [createNewChat, curChatEnd, sendMessage],
      );

      /**
       * 取消当前对话生成
       */
      const cancelChat = useCallback(async () => {
        if (activeChat?._id) {
          try {
            await Post(
              `/chat/${activeChat._id}/_cancel?message_id=${curIdRef.current}`,
              undefined,
            );
          } catch (e) {
            console.error(e);
          }
        }
        setCurChatEnd(true); // 强制标记为结束
      }, [activeChat, setCurChatEnd]);

      /**
       * 切换当前选中的对话
       * 负责重置状态并加载新对话的历史记录
       */
      const onSelectChat = useCallback(
        async (chat?: Chat) => {
          activeMessageRef.current?.reset(); // 重置上一条消息的 UI 状态
          setCurChatEnd(true);
          setTimedoutShow(false);

          console.log("setActiveChat5", chat);
          setActiveChat(chat);
          if (chat?._id) {
            await fetchHistory(chat?._id); // 加载历史记录
          }
        },
        [setActiveChat, setCurChatEnd, fetchHistory],
      );

      /**
       * 清除当前选中的对话（返回初始状态）
       */
      const clearChat = useCallback(() => {
        onSelectChat(undefined);
      }, [onSelectChat]);

      // Use a ref to track the last processed active chat ID
      const lastActiveChatIdRef = useRef<string | undefined>(undefined);

      useEffect(() => {
        console.log(555555, activeChat?._id, lastActiveChatIdRef.current);
        // Only trigger onSelectChat if the activeChat ID has actually changed
        if (activeChat?._id && activeChat._id !== lastActiveChatIdRef.current) {
          lastActiveChatIdRef.current = activeChat._id;
          // Use setTimeout to avoid synchronous state updates during render
          setTimeout(() => {
            onSelectChat(activeChat);
          }, 0);
        }
      }, [activeChat, onSelectChat]);

      // 生成文件预览 URL 的辅助函数
      const getFileUrl = useCallback(
        (path: string) =>
          `${baseUrl?.replace(/\/$/, "")}/files/${encodeURIComponent(path)}`,
        [baseUrl],
      );

      // 暴露给父组件的方法
      useImperativeHandle(ref, () => ({
        init: (params: SendMessageParams) => {
          if (!activeChat?._id) {
            createNewChat(params);
          } else {
            handleSendMessage(activeChat, params);
          }
        },
        cancelChat: () => {
          cancelChat();
        },
        clearChat,
        onSelectChat,
      }));

      return (
        <div className="flex flex-col rounded-md h-full overflow-hidden relative">
          <ChatContent
            activeChat={activeChat}
            activeMessageRef={activeMessageRef}
            timedoutShow={timedoutShow}
            Question={Question}
            handleSendMessage={(message) =>
              handleSendMessage(activeChat, { message })
            }
            getFileUrl={getFileUrl}
            formatUrl={formatUrl}
            curIdRef={curIdRef}
            t={t}
            currentAssistant={currentAssistant}
          />
        </div>
      );
    },
  ),
);

const ChatAI = memo(
  forwardRef<ChatAIRef, ChatAIProps>((props, ref) => {
    return (
      <I18nextProvider i18n={i18n}>
        <InnerChatAI {...props} ref={ref} />
      </I18nextProvider>
    );
  }),
);

export default ChatAI;
