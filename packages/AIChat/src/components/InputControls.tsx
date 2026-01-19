import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Brain, Telescope } from "lucide-react";
import clsx from "clsx";

import SearchPopover, { type DataSource } from "./SearchPopover";
import MCPPopover from "./MCPPopover";
import { resources } from "../i18n";

interface InputControlsProps {
  // Deep Research
  isDeepResearchActive?: boolean;
  setIsDeepResearchActive?: (val: boolean) => void;

  // Deep Think
  isDeepThinkActive: boolean;
  setIsDeepThinkActive: (val: boolean) => void;
  deepThinkingShortcut?: string;

  // Datasource
  datasource?: { enabled?: boolean; visible?: boolean };
  selectedDataSourceIds?: string[];
  onDataSourceSelectionChange?: (ids: string[]) => void;
  isSearchActive?: boolean;
  setIsSearchActive?: (val: boolean) => void;
  getDataSources?: (query?: string) => Promise<DataSource[]>;
  searchShortcut?: string;

  // MCP
  mcp_servers?: { enabled?: boolean; visible?: boolean };
  selectedMCPIds?: string[];
  onMCPSelectionChange?: (ids: string[]) => void;
  isMCPActive?: boolean;
  setIsMCPActive?: (val: boolean) => void;
  getMCPByServer?: (query?: string) => Promise<DataSource[]>;
  mcpShortcut?: string;
}

const InputControls = ({
  isDeepResearchActive = false,
  setIsDeepResearchActive = () => {},

  isDeepThinkActive,
  setIsDeepThinkActive,

  datasource,
  selectedDataSourceIds = [],
  onDataSourceSelectionChange = () => {},
  isSearchActive = false,
  setIsSearchActive = () => {},
  getDataSources = async () => [],
  searchShortcut,

  mcp_servers,
  selectedMCPIds = [],
  onMCPSelectionChange = () => {},
  isMCPActive = false,
  setIsMCPActive = () => {},
  getMCPByServer = async () => [],
  mcpShortcut,
}: InputControlsProps) => {
  const { t, i18n } = useTranslation("ai_chat");

  useEffect(() => {
    (Object.keys(resources) as Array<keyof typeof resources>).forEach((lng) => {
      if (resources[lng]?.translation) {
        i18n.addResourceBundle(
          lng as string,
          "ai_chat",
          resources[lng].translation,
          true,
          true
        );
      }
    });
  }, [i18n]);

  return (
    <div className="flex items-center pt-2 gap-2">
      <div
        className={clsx(
          "flex items-center justify-center gap-1 h-8 px-2 rounded-full transition hover:bg-[#EDEDED] dark:hover:bg-[#202126] cursor-pointer"
        )}
        style={{
          backgroundColor: isDeepResearchActive
            ? "rgba(1,138,229,0.21)"
            : undefined,
        }}
        onClick={() => setIsDeepResearchActive(!isDeepResearchActive)}
        title={t("search.input.deepResearch") || "DeepResearch"}
      >
        <Telescope
          className={clsx("size-4", {
            "text-[#1784FC] dark:text-[#1784FC]": isDeepResearchActive,
            "text-[#333] dark:text-[#999]": !isDeepResearchActive,
          })}
        />
        {isDeepResearchActive && (
          <span className="text-[#1784FC] text-xs">
            {t("search.input.deepResearch") || "DeepResearch"}
          </span>
        )}
      </div>
      
      <div
        className={clsx(
          "flex items-center justify-center gap-1 h-8 px-2 rounded-full transition hover:bg-[#EDEDED] dark:hover:bg-[#202126] cursor-pointer"
        )}
        style={{
          backgroundColor: isDeepThinkActive
            ? "rgba(1,138,229,0.21)"
            : undefined,
        }}
        onClick={() => setIsDeepThinkActive(!isDeepThinkActive)}
        title={t("search.input.deepThink") || "DeepThink"}
      >
        <Brain
          className={clsx("size-4", {
            "text-[#1784FC] dark:text-[#1784FC]": isDeepThinkActive,
            "text-[#333] dark:text-[#999]": !isDeepThinkActive,
          })}
        />
        {isDeepThinkActive && (
          <span className="text-[#1784FC] text-xs">
            {t("search.input.deepThink") || "DeepThink"}
          </span>
        )}
      </div>

      <SearchPopover
        datasource={datasource || {}}
        selectedIds={selectedDataSourceIds}
        onSelectionChange={onDataSourceSelectionChange}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        getDataSources={getDataSources}
        shortcut={searchShortcut}
      />

      <MCPPopover
        mcp_servers={mcp_servers || {}}
        selectedIds={selectedMCPIds}
        onSelectionChange={onMCPSelectionChange}
        isMCPActive={isMCPActive}
        setIsMCPActive={setIsMCPActive}
        getMCPByServer={getMCPByServer}
        shortcut={mcpShortcut}
      />
    </div>
  );
};

export default InputControls;
