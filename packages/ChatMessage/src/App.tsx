import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./components";
import type { IChatMessage } from "./types/chat";
import "./App.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Send, Square } from "lucide-react";

// Initialize dummy i18n
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {
            "assistant.message.steps.think": "Thinking Process",
            "assistant.message.steps.tools": "Using Tools",
            "assistant.message.steps.search": "Searching",
            "assistant.message.logo": "Assistant"
          }
        }
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
    });
}

// Initial mock data
const INITIAL_MESSAGES: IChatMessage[] = [
  {
    _id: "init-1",
    _source: {
      type: "assistant",
      message: "Hello! I'm Coco, your AI assistant. I can help you with coding, analysis, and more. Try asking me something complex involving reasoning or code!",
      assistant_id: "coco-bot",
    },
  },
  {
    _id: "init-2",
    _source: {
      type: "user",
      message: "Can you explain how the Event Loop works in JavaScript?",
      question: "Can you explain how the Event Loop works in JavaScript?",
    }
  },
  {
    _id: "init-3",
    _source: {
      type: "assistant",
      message: "The **Event Loop** is a fundamental concept in JavaScript's concurrency model. It allows Node.js and browsers to perform non-blocking I/O operations despite JavaScript being single-threaded.\n\nHere is a simplified diagram using Mermaid:\n\n```mermaid\ngraph TD\n    A[Call Stack] -->|Async Task| B[Web APIs]\n    B -->|Callback| C[Task Queue]\n    C -->|Event Loop| A\n```\n\n### Key Components:\n1. **Call Stack**: Where code is executed.\n2. **Web APIs**: Browser APIs like `setTimeout`, `fetch`.\n3. **Task Queue**: Holds callbacks ready to execute.\n4. **Event Loop**: Checks if Stack is empty, then pushes from Queue to Stack.",
      assistant_id: "coco-bot",
      details: [
        {
          type: "think",
          description: "The user is asking about the Event Loop. I should explain the Call Stack, Web APIs, Task Queue, and the Loop itself. A diagram would be helpful."
        }
      ]
    }
  }
];

function App() {
  const [messages, setMessages] = useState<IChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

    // Create a placeholder message for the assistant
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

    // Simulate "Thinking" phase
    const thinkContent = "I need to analyze the user's request: \"" + userQuestion + "\".\nChecking available tools...\nDeciding to answer directly.";
    let currentThink = "";
    
    // Simulate streaming think
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
                details: [{ type: "think", description: currentThink }], // Update details for final view
                think: { chunk_type: "think", message_chunk: currentThink } // Update real-time chunk
              }
            };
          }
          return msg;
        })
      );
      await new Promise(r => setTimeout(r, 20)); // Fast typing for think
    }

    // Simulate "Tool" phase (optional, just for demo)
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

    // Simulate "Message" response phase
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
                // Clear active chunks when moving to next phase or keep them if needed. 
                // Usually 'think' stays in details, but 'think' chunk property might be cleared or kept depending on UI impl.
                // Here we keep details updated.
              }
            };
          }
          return msg;
        })
      );
      await new Promise(r => setTimeout(r, 30 + Math.random() * 20)); // Random typing speed
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
    <div className="chat-container">
      <div className="chat-header">
        Coco Chat
      </div>
      
      <div className="messages-area">
        {messages.map((msg) => (
            <ChatMessage 
              key={msg._id}
              message={msg} 
              // Pass chunk data if it's the last message and typing (optional, depending on component logic)
              think={msg._source.think}
              tools={msg._source.tools}
            />
        ))}
        {/* Invisible element to scroll to */}
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
