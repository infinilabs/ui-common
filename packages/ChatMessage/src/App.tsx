import { useState, useEffect, useRef } from "react";
import { ConfigProvider, theme as antTheme } from "antd";
import { ChatMessage, type ChatMessageRef } from "./components";
import type { IChatMessage, IChunkData } from "./types/chat";
import { demoData } from "./demo";
import "./App.css";
import { Send, Square } from "lucide-react";
import SessionFiles from "./components/SessionFiles";
import { deepResearchMockChunks } from "./components/data";

const INITIAL_MESSAGES: IChatMessage[] = [
  ...(demoData?.hits?.hits ?? []).map((hit: any) => ({
    _id: hit?._id ?? String(Math.random()),
    _source: hit?._source ?? {},
  })),
  {
    _id: "demo-attachment-msg",
    _source: {
      type: "user",
      message: "Here are some files for you to review.",
      created: new Date().toISOString(),
      user: { username: "User" },
      attachments: ["1", "2", "3"],
    },
  },
];

function App() {
  const [messages, setMessages] = useState<IChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeMessageRef = useRef<ChatMessageRef>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]); // Scroll when messages change or typing starts

  const streamResponse = async (userQuestion: string) => {
    console.log("User asked:", userQuestion);
    setIsTyping(true);
    const newMsgId = Date.now().toString();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const assistantMsg: IChatMessage = {
      _id: newMsgId,
      _source: {
        type: "assistant",
        message: "", // Initially empty
        assistant_id: "coco-bot",
        details: [],
      },
    };

    setMessages((prev) => [...prev, assistantMsg]);

    // Allow React to render the new message and attach ref
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!activeMessageRef.current) {
      console.error("Active message ref not attached!");
    } else {
      // Clear any previous state in the component instance
      activeMessageRef.current.reset();
    }

    // Use demo data if available, otherwise fallback to simple simulation
    const demoHit = demoData?.hits?.hits?.[1];
    const demoDetails = demoHit?._source?.details || [];
    const demoMessage = demoHit?._source?.message || "I am Coco AI.";

    // Iterate through details from demo data to simulate the process
    for (const detail of demoDetails) {
      if (abortController.signal.aborted) return;

      // Update message state to include this detail (for persistence/Detail prop)
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg._id === newMsgId) {
            return {
              ...msg,
              _source: {
                ...msg._source,
                details: [...(msg._source.details || []), detail],
              },
            };
          }
          return msg;
        })
      );

      // Simulate streaming based on type
      const type = detail.type;
      const payload = detail.payload;

      if (type === "query_intent") {
        // Simulate analysis delay
        await new Promise((r) => setTimeout(r, 500));
        // Send JSON chunk
        const chunk: IChunkData = {
          chunk_type: "query_intent",
          message_chunk: "<JSON>" + JSON.stringify(payload) + "</JSON>",
        };
        activeMessageRef.current?.addChunk(chunk);
        await new Promise((r) => setTimeout(r, 500));
      } else if (type === "fetch_source") {
        // Simulate fetching
        const sources = payload as any[];
        if (sources && sources.length > 0) {
          // Send total count first
          activeMessageRef.current?.addChunk({
            chunk_type: "fetch_source",
            message_chunk: `<Payload total=${sources.length}>`,
          });

          // Stream sources in batches or all at once
          // The component regex matches the full array: /\[([\s\S]*)\]/
          // So we send the full JSON array string
          const jsonStr = JSON.stringify(sources);
          // We can simulate streaming this string if we want, but sending it in one go is safer for the regex
          activeMessageRef.current?.addChunk({
            chunk_type: "fetch_source",
            message_chunk: jsonStr,
          });
          await new Promise((r) => setTimeout(r, 1000));
        }
      } else if (type === "pick_source") {
        const picks = payload as any[];
        if (picks && picks.length > 0) {
          const chunk: IChunkData = {
            chunk_type: "pick_source",
            message_chunk: "<JSON>" + JSON.stringify(picks) + "</JSON>",
          };
          activeMessageRef.current?.addChunk(chunk);
          await new Promise((r) => setTimeout(r, 800));
        }
      } else if (type === "deep_read") {
        // Simulate reading documents
        // For demo, we can just show a loading state or stream some text if we had the doc titles separate
        // The Detail.description contains the text.
        // DeepRead component uses message_chunk split by & to show "reading..." items.
        // We can extract titles from the description if possible, or just skip streaming chunk and rely on Detail

        // Let's try to simulate streaming "Reading..." items
        const lines = (detail.description || "")
          .split("\n")
          .filter((l) => l.trim().startsWith("Obtaining"));
        let accumulated = "";
        for (const line of lines) {
          const title = line.split(":").pop()?.trim();
          if (title) {
            accumulated = accumulated ? accumulated + "&" + title : title;
            activeMessageRef.current?.addChunk({
              chunk_type: "deep_read",
              message_chunk: accumulated,
            });
            await new Promise((r) => setTimeout(r, 300));
          }
        }
        if (!lines.length) {
          await new Promise((r) => setTimeout(r, 500));
        }
      } else if (type === "think") {
        // Stream thought text
        const text = detail.description || "";
        for (let i = 0; i < text.length; i += 5) {
          // Stream faster
          if (abortController.signal.aborted) return;
          activeMessageRef.current?.addChunk({
            chunk_type: "think",
            message_chunk: text.slice(i, i + 5),
          });
          await new Promise((r) => setTimeout(r, 10));
        }
      }
    }

    // Simulate Response Phase
    let fullResponse = "";
    // Use the demo message
    const responseText = demoMessage;

    for (let i = 0; i < responseText.length; i++) {
      if (abortController.signal.aborted) return;
      const char = responseText[i];
      fullResponse += char;

      const chunk: IChunkData = {
        chunk_type: "response",
        message_chunk: char,
      };
      activeMessageRef.current?.addChunk(chunk);

      // Variable speed typing
      await new Promise((r) => setTimeout(r, Math.random() * 10));
    }

    // Finalize: Update the message in state so it persists with full content
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg._id === newMsgId) {
          return {
            ...msg,
            _source: {
              ...msg._source,
              message: fullResponse,
              // Ensure all details are final
              details: demoDetails,
            },
          };
        }
        return msg;
      })
    );

    setIsTyping(false);
    abortControllerRef.current = null;
  };

  const streamDeepResearchDemo = async (userQuestion: string) => {
    console.log("Deep research demo for:", userQuestion);
    setIsTyping(true);
    const newMsgId = Date.now().toString();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const assistantMsg: IChatMessage = {
      _id: newMsgId,
      _source: {
        type: "assistant",
        message: "",
        assistant_id: "coco-bot",
        details: [],
      },
    };

    setMessages((prev) => [...prev, assistantMsg]);

    await new Promise((resolve) => setTimeout(resolve, 50));

    if (!activeMessageRef.current) {
      console.error("Active message ref not attached!");
      setIsTyping(false);
      abortControllerRef.current = null;
      return;
    }

    activeMessageRef.current.reset();

    const summary =
      "这是一个围绕 “Coco AI” 的深度研究流程示例，真实环境下内容由服务端生成。";

    setMessages((prev) =>
      prev.map((msg) => {
        if (msg._id === newMsgId) {
          return {
            ...msg,
            _source: {
              ...msg._source,
              message: summary,
            },
          };
        }
        return msg;
      })
    );

    for (const chunk of deepResearchMockChunks) {
      if (abortController.signal.aborted) return;
      activeMessageRef.current.addChunk(chunk);
      console.log(chunk);
      await new Promise((r) => setTimeout(r, 1000));
    }

    setIsTyping(false);
    abortControllerRef.current = null;
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: IChatMessage = {
      _id: `user-${Date.now()}`,
      _source: {
        type: "user",
        question: inputValue,
        message: inputValue,
      },
    };

    setMessages((prev) => [...prev, userMsg]);
    const question = inputValue;
    setInputValue("");

    if (question.trim().toLowerCase() === "what is coco ai?") {
      streamDeepResearchDemo(question);
    } else {
      streamResponse(question);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsTyping(false);
    }
  };

  return (
    <div
      className={`chat-container ${
        theme === "dark" ? "dark bg-[#1a1a1a] text-white" : ""
      }`}
    >
      <div className="chat-header flex justify-between items-center px-4">
        <span>Coco Chat</span>
        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setLocale("en")}
            className={`px-2 py-1 rounded ${
              locale === "en"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLocale("zh")}
            className={`px-2 py-1 rounded ${
              locale === "zh"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            ZH
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`px-2 py-1 rounded ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-2 py-1 rounded ${
              theme === "dark"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="messages-area">
        {messages.map((msg, index) => {
          const isLast = index === messages.length - 1;
          const isAssistant = msg._source.type === "assistant";
          // Only attach ref to the last assistant message if we are typing
          const shouldAttachRef = isLast && isAssistant && isTyping;

          return (
            <ChatMessage
              key={msg._id}
              ref={shouldAttachRef ? activeMessageRef : null}
              message={msg}
              locale={locale}
              theme={theme}
              isTyping={shouldAttachRef} // Pass isTyping only to the active message
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="input-wrapper">
          <input
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message Coco..."
            disabled={isTyping}
          />
          {isTyping ? (
            <button className="send-button" onClick={handleStop}>
              <Square fill="currentColor" />
            </button>
          ) : (
            <button
              className="send-button"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send />
            </button>
          )}
        </div>
      </div>

      <ConfigProvider
        theme={{
          algorithm:
            theme === "dark"
              ? antTheme.darkAlgorithm
              : antTheme.defaultAlgorithm,
        }}
      >
        <SessionFiles />
      </ConfigProvider>
    </div>
  );
}

export default App;
