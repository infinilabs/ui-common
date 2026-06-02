import { useTranslation } from "react-i18next";
import { Brain, Telescope } from "lucide-react";
import clsx from "clsx";

import SearchPopover, { type DataSource } from "./SearchPopover";
import MCPPopover from "./MCPPopover";
import type { TFunction } from "i18next";

interface InputControlsProps {
  // Deep Research
  isDeepResearchActive?: boolean;
  setIsDeepResearchActive?: (val: boolean) => void;
  showDeepResearch?: boolean;

  // Deep Think
  isDeepThinkActive?: boolean;
  setIsDeepThinkActive?: (val: boolean) => void;
  deepThinkingShortcut?: string;
  showDeepThink?: boolean;

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
  t?: TFunction;
}

const InputControls = ({
  isDeepResearchActive = false,
  setIsDeepResearchActive = () => {},
  showDeepResearch = true,

  isDeepThinkActive = false,
  setIsDeepThinkActive,
  showDeepThink = true,

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
  t: tProp,
}: InputControlsProps) => {
  const { t: tOriginal } = useTranslation();
  const t = tProp || tOriginal;

  return (
    <div className="flex items-center pt-3 gap-2">
      {showDeepResearch && (<div
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
      </div>)}
      
      {showDeepThink && (<div
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
      </div>)}

      <SearchPopover
        datasource={datasource || {}}
        selectedIds={selectedDataSourceIds}
        onSelectionChange={onDataSourceSelectionChange}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        getDataSources={getDataSources}
        shortcut={searchShortcut}
        t={t}
      />

      <MCPPopover
        mcp_servers={mcp_servers || {}}
        selectedIds={selectedMCPIds}
        onSelectionChange={onMCPSelectionChange}
        isMCPActive={isMCPActive}
        setIsMCPActive={setIsMCPActive}
        getMCPByServer={getMCPByServer}
        shortcut={mcpShortcut}
        t={t}
      />
    </div>
  );
};

export default InputControls;
