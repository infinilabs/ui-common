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
  isDeepThinkActive?: boolean;
  setIsDeepThinkActive?: (val: boolean) => void;
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

  isDeepThinkActive = false,
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
    <div className="flex items-center pt-3 gap-2">
      <div
        className={clsx(
          "flex items-center justify-center gap-1 h-6 px-2 rounded-full transition cursor-pointer"
        )}
        style={{
          backgroundColor: isDeepResearchActive
            ? 'var(--ant-color-primary-bg)'
            : undefined,
        }}
        onClick={() => setIsDeepResearchActive(!isDeepResearchActive)}
        title={t("search.input.deepResearch") || "DeepResearch"}
      >
        <Telescope
          className="size-4"
          style={{ color: isDeepResearchActive ? 'var(--ant-color-primary)' : 'var(--ant-color-text-secondary)' }}
        />
        {isDeepResearchActive && (
          <span className="text-xs" style={{ color: 'var(--ant-color-primary)' }}>
            {t("search.input.deepResearch") || "DeepResearch"}
          </span>
        )}
      </div>
      
      <div
        className={clsx(
          "flex items-center justify-center gap-1 h-6 px-2 rounded-full transition cursor-pointer"
        )}
        style={{
          backgroundColor: isDeepThinkActive
            ? 'var(--ant-color-primary-bg)'
            : undefined,
        }}
        onClick={() => setIsDeepThinkActive?.(!isDeepThinkActive)}
        title={t("search.input.deepThink") || "DeepThink"}
      >
        <Brain
          className="size-4"
          style={{ color: isDeepThinkActive ? 'var(--ant-color-primary)' : 'var(--ant-color-text-secondary)' }}
        />
        {isDeepThinkActive && (
          <span className="text-xs" style={{ color: 'var(--ant-color-primary)' }}>
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
