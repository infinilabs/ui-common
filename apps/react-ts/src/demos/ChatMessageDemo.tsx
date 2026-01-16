import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@infinilabs/chat-message';
import type { IChatMessage } from '@infinilabs/chat-message';
import { Send, Square } from 'lucide-react';

// Using partial data from packages/ChatMessage/src/demo.ts
const DEMO_DATA = {
  "hits": {
    "hits": [
      {
        "_id": "d5fjtsek7e3va6t252f0",
        "_source": {
          "type": "user",
          "message": "What is Coco AI?",
        }
      },
      {
        "_id": "d5fjtsek7e3va6t252fg",
        "_source": {
          "type": "assistant",
          "message": "Coco AI is a powerful, open-source unified AI search tool.",
          "details": [
            {
              "type": "query_intent",
              "payload": {
                "query": ["What is Coco AI?"],
                "keyword": ["Coco AI"],
                "suggestion": ["How to install?"]
              }
            },
            {
              "type": "think",
              "payload": {
                "thought": "Thinking about the answer..."
              }
            }
          ]
        }
      }
    ]
  }
};

const INITIAL_MESSAGES: IChatMessage[] = (DEMO_DATA?.hits?.hits ?? []).map((hit) => ({
  _id: hit?._id ?? String(Math.random()),
  _source: hit?._source ?? {},
}));

export default function ChatMessageDemo() {
  const [messages, setMessages] = useState<IChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [locale, setLocale] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
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

    // Simulate thinking
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

    // Simulate tool call
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
                        ...(msg._source.details || []),
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

    // Simulate response
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

    const userMsg = {
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
    <div className={`p-4 border rounded-xl mb-8 flex flex-col h-[800px] ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ChatMessage Component Demo</h2>
        
        <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Locale:</span>
                <button 
                    onClick={() => setLocale('en')} 
                    className={`px-2 py-1 text-xs border rounded ${locale === 'en' ? 'bg-blue-500 text-white' : ''}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLocale('zh')} 
                    className={`px-2 py-1 text-xs border rounded ${locale === 'zh' ? 'bg-blue-500 text-white' : ''}`}
                >
                    ZH
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Theme:</span>
                <button 
                    onClick={() => setTheme('light')} 
                    className={`px-2 py-1 text-xs border rounded ${theme === 'light' ? 'bg-blue-500 text-white' : ''}`}
                >
                    Light
                </button>
                <button 
                    onClick={() => setTheme('dark')} 
                    className={`px-2 py-1 text-xs border rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : ''}`}
                >
                    Dark
                </button>
            </div>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto border rounded p-4 mb-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#333]' : 'bg-gray-50 border-gray-200'}`}>
        {messages.map((msg) => (
            <ChatMessage 
              key={msg._id}
              message={msg} 
              locale={locale}
              theme={theme}
            />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
          <input
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-[#333] border-[#444] text-white' : 'bg-white border-gray-300'}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message (try 'calc' for tools)..."
            disabled={isTyping}
          />
          {isTyping ? (
            <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleStop}
            >
              <Square size={20} fill="currentColor" />
            </button>
          ) : (
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send size={20} />
            </button>
          )}
      </div>
    </div>
  );
}
