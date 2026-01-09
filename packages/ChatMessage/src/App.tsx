import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./components";
import type { IChatMessage } from "./types/chat";
import { demoData } from "./demo";
import "./App.css";
import { Send, Square } from "lucide-react";

const INITIAL_MESSAGES: IChatMessage[] = (demoData?.hits?.hits ?? []).map((hit: any) => ({
  _id: hit?._id ?? String(Math.random()),
  _source: hit?._source ?? {},
}));

function App() {
  const [messages, setMessages] = useState<IChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamResponse = async (userQuestion: string) => {
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
        think: undefined,
        tools: undefined,
      },
    };

    setMessages((prev) => [...prev, assistantMsg]);

    const thinkContent = "I need to analyze the user's request: \"" + userQuestion + "\".\nChecking available tools...\nDeciding to answer directly.";
    let currentThink = "";
    
    for (let i = 0; i < thinkContent.length; i++) {
      if (abortController.signal.aborted) return;
      currentThink += thinkContent[i];
      
      setMessages((prev) => 
        prev.map(msg => {
          if (msg._id === newMsgId) {
            return {
              ...msg,
              _source: {
                ...msg._source,
                details: [{ type: "think", description: currentThink }],
                think: { chunk_type: "think", message_chunk: currentThink }
              }
            };
          }
          return msg;
        })
      );
      await new Promise(r => setTimeout(r, 20));
    }

    if (userQuestion.toLowerCase().includes("calc") || userQuestion.toLowerCase().includes("math")) {
        const toolContent = "Running: `calculate_expression`\nInput: " + userQuestion;
        setMessages((prev) => 
            prev.map(msg => {
              if (msg._id === newMsgId) {
                return {
                  ...msg,
                  _source: {
                    ...msg._source,
                    details: [
                        ...msg._source.details!,
                        { type: "tools", description: toolContent }
                    ],
                    tools: { chunk_type: "tools", message_chunk: toolContent }
                  }
                };
              }
              return msg;
            })
          );
        await new Promise(r => setTimeout(r, 800));
    }

    const responseText = `Here is a simulated response for your query: **"${userQuestion}"**.\n\nI can format code:\n\`\`\`typescript\nconst answer = 42;\nconsole.log(answer);\n\`\`\`\n\nAnd I can also use lists:\n- Item A\n- Item B\n- Item C`;
    let currentMessage = "";

    for (let i = 0; i < responseText.length; i++) {
      if (abortController.signal.aborted) return;
      currentMessage += responseText[i];
      
      setMessages((prev) => 
        prev.map(msg => {
          if (msg._id === newMsgId) {
            return {
              ...msg,
              _source: {
                ...msg._source,
                message: currentMessage,
              }
            };
          }
          return msg;
        })
      );
      await new Promise(r => setTimeout(r, 30 + Math.random() * 20));
    }

    setIsTyping(false);
    abortControllerRef.current = null;
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: IChatMessage = {
      _id: Date.now().toString(),
      _source: {
        type: "user",
        question: inputValue,
        message: inputValue,
      },
    };

    setMessages((prev) => [...prev, userMsg]);
    const question = inputValue;
    setInputValue("");
    
    streamResponse(question);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsTyping(false);
    }
  };

  return (
    <div className={`chat-container ${theme === 'dark' ? 'bg-[#1a1a1a] text-white' : ''}`}>
      <div className="chat-header flex justify-between items-center px-4">
        <span>Coco Chat</span>
        <div className="flex gap-2 text-sm">
             <button onClick={() => setLocale('en')} className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>EN</button>
             <button onClick={() => setLocale('zh')} className={`px-2 py-1 rounded ${locale === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>ZH</button>
             <button onClick={() => setTheme('light')} className={`px-2 py-1 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>Light</button>
             <button onClick={() => setTheme('dark')} className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>Dark</button>
        </div>
      </div>
      
      <div className="messages-area">
        {messages.map((msg) => (
            <ChatMessage 
              key={msg._id}
              message={msg} 
              think={msg._source.think}
              tools={msg._source.tools}
              locale={locale}
              theme={theme}
            />
        ))}
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
    </div>
  );
}

export default App;
