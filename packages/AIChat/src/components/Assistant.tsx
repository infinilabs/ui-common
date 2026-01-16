import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { debounce } from "lodash-es";
import { useChatStore } from "@/stores/chatStore";
import { I18nextProvider, useTranslation } from "react-i18next";
import { type TFunction } from "i18next";
import i18n from "@/i18n";
import { ChevronDown, RefreshCw, Search } from "lucide-react";
import { Input, type InputRef } from "@/components/ui/input";
import { Post } from "@/api/axiosRequest";

interface AssistantListProps {
  BaseUrl: string;
  Token?: string;
  assistantIDs?: string[];
  locale?: string;
  t?: TFunction;
}

interface AssistantHit {
  _id: string;
  _source?: {
    name?: string;
    icon?: string;
    [key: string]: unknown;
  };
}

export function AssistantList({ assistantIDs = [], locale = "en", t: tProp }: AssistantListProps) {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;
  const currentAssistant = useChatStore((state) => state.currentAssistant);
  const setCurrentAssistant = useChatStore((state) => state.setCurrentAssistant);

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  const [assistants, setAssistants] = useState<AssistantHit[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef<InputRef>(null);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useMemo(
    () => debounce((k: string) => setKeyword(k), 500),
    []
  );

  const fetchAssistant = useCallback(
    async (page = 1, pageSize = 5) => {
      try {
        const queryParams = [`current=${page}`, `pageSize=${pageSize}`];
        if (keyword) queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
        if (assistantIDs.length) queryParams.push(`ids=${encodeURIComponent(assistantIDs.join(","))}`);

        const [error, res] = await Post<{
          hits?: { hits?: AssistantHit[] };
        }>(`/assistant/_search?${queryParams.join("&")}`, undefined);

        if (error) {
          console.error("_search", error);
          return;
        }

        const list = (res?.data?.hits?.hits ?? []) as AssistantHit[];
        setAssistants(list);
      } catch (e) {
        console.error(e);
      }
    },
    [assistantIDs, keyword]
  );

  useEffect(() => {
    const t = setTimeout(() => {
      fetchAssistant(1, 5);
    }, 0);
    return () => clearTimeout(t);
  }, [fetchAssistant]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAssistant(1, 5);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="relative">
        <button
          className="flex cursor-pointer items-center gap-1 border border-border rounded-xl px-2 py-1.5 hover:bg-accent transition-colors"
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setTimeout(() => {
              if (searchInputRef.current) searchInputRef.current.focus();
            }, 0);
          }}
        >
          {currentAssistant?._source?.icon ? (
            <img
              src={currentAssistant._source.icon}
              className="w-4 h-4 mr-1"
              alt="assistant"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />
          ) : null}
          <span className="text-sm">
            {currentAssistant?._source?.name || t("assistant_list.default_name")}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        {open && (
          <div
            className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-border bg-background text-foreground shadow-lg p-3"
            onMouseMove={() => {
              // no-op
            }}
          >
            <div className="flex items-center justify-between text-sm font-semibold mb-2">
              <div className="truncate">
                {t("assistant_list.title")}（{assistants.length}）
              </div>
              <button
                className="h-6 w-6 flex items-center justify-center cursor-pointer rounded hover:bg-accent transition-colors"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRefresh();
                }}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={clsx("w-4 h-4 text-foreground hover:text-primary", {
                    "animate-spin": isRefreshing,
                  })}
                />
              </button>
            </div>

            <div className="mt-2">
              <Input
                ref={searchInputRef}
                autoFocus
                value={keyword}
                placeholder={t("assistant_list.search.placeholder")}
                className="h-8 rounded-full bg-background"
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                onChange={(event) => {
                  debouncedKeyword(event.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="mt-2 max-h-60 overflow-auto custom-scrollbar">
              {assistants.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {assistants.map((assistant) => {
                    const name = assistant._source?.name || assistant._id;
                    const isActive = currentAssistant?._id === assistant._id;
                    return (
                      <button
                        key={assistant._id}
                        className={clsx(
                          "w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                        onClick={() => {
                          setCurrentAssistant({
                            _id: assistant._id,
                            _source: assistant._source,
                          });
                          setOpen(false);
                        }}
                      >
                        {assistant._source?.icon ? (
                          <img
                            src={assistant._source.icon}
                            className="w-4 h-4"
                            alt=""
                            onError={(e) => {
                              const el = e.currentTarget as HTMLImageElement;
                              el.style.display = "none";
                            }}
                          />
                        ) : null}
                        <div className="truncate">{name}</div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-3 text-center text-sm text-muted-foreground">
                  {t("assistant_list.no_data")}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </I18nextProvider>
  );
}
