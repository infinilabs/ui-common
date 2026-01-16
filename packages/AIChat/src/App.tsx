import { useRef, useCallback, useEffect, useState } from "react";
import { Send, Paperclip, Languages, Sparkles, SquarePen, Moon, Sun, User, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

import ChatAI, { type ChatAIRef } from "./components/Chat";
import { History } from "./components/History";
import { AssistantList } from "./components/Assistant";

function App() {
  const { t } = useTranslation();
  const chatRef = useRef<ChatAIRef | null>(null);
  const [message, setMessage] = useState("");
  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const BaseUrl = "https://dev.infini.cloud:27200";
  const Token = "d5ir2ch4d9v59fpi3nvgjw9rjqt4a6petih7u2lmoyj75m808jjd0tkm85e3uvantvqxytzvre9u6ak8jlc0";

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const appStore = { state: { endpoint_http: BaseUrl } };
    localStorage.setItem("app-store", JSON.stringify(appStore));

    if (Token) {
      const headers = { "X-API-TOKEN": Token };
      localStorage.setItem("headers", JSON.stringify(headers));
    } else {
      localStorage.removeItem("headers");
    }
  }, [BaseUrl, Token]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "zh-CN" : "en"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleSend = useCallback(async () => {
    if (!message.trim()) return;
    
    if (chatRef.current) {
      chatRef.current.init({ message });
      setMessage("");
    }
  }, [message]);

  const handleNewChat = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.clearChat();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chatRef.current.onSelectChat({} as any);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
      {/* Left History Panel */}
      <div className="w-[260px] shrink-0 border-r border-border bg-background flex flex-col transition-all duration-300">
        <div className="h-16 flex shrink-0 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
               {/* Logo Placeholder */}
               <div className="font-bold text-xl tracking-tight flex items-center gap-1">
                 <img src="https://infinilabs.com/img/logo-icon.png" className="w-6 h-6" alt="logo" />
                 <span>Coco</span>
               </div>
            </div>
            <div className="bg-muted px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" fill="currentColor" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase">{t("app.logo.chat")}</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <History BaseUrl={BaseUrl} Token={Token} locale={locale} t={t} />
        </div>
      </div>

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background">
        
        {/* Top Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-background z-10">
          <div className="flex items-center gap-2">
            <AssistantList BaseUrl={BaseUrl} Token={Token} locale={locale} t={t} />
            <button 
              onClick={handleNewChat}
              className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
              title={t("app.new_chat")}
            >
              <SquarePen className="w-4 h-4" />
            </button>
          </div>

          <div className="font-medium text-sm">
            {/* Title Placeholder */}
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={toggleLocale} 
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground" 
              title="Switch Language"
            >
              <Languages className="w-4 h-4" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button 
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground"
              title="User Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Chat Area */}
        <div className="flex-1 overflow-hidden relative">
          <div className="h-full w-full max-w-3xl mx-auto flex flex-col">
            <ChatAI
              ref={chatRef}
              BaseUrl={BaseUrl}
              Token={Token}
              locale={locale}
              t={t}
            />
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="shrink-0 p-4 pb-8 bg-background">
          <div className="max-w-3xl mx-auto w-full">
            <div className="relative flex items-end border border-input rounded-[24px] bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring focus-within:border-primary transition-all p-2 pl-4">
              <div className="py-2.5 mr-2 text-muted-foreground">
                <Globe className="w-4 h-4" />
              </div>
              <textarea
                className="flex-1 resize-none border-0 bg-transparent py-2.5 focus:outline-none text-sm leading-relaxed max-h-[200px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                placeholder={t("app.input.placeholder")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{ minHeight: "44px" }}
              />
              <div className="flex items-center gap-1 pb-1">
                 <button className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors">
                    <Paperclip className="w-4 h-4" />
                 </button>
                 <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
              </div>
            </div>
            <div className="text-center mt-3">
              <span className="text-[10px] text-muted-foreground/60">
                {t("app.disclaimer")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
