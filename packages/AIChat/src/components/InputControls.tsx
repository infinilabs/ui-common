import { useTranslation } from "react-i18next";
import { Telescope, Globe, Hammer } from "lucide-react";
import clsx from "clsx";
import VisibleKey from "./VisibleKey";

interface InputControlsProps {
  isChatMode: boolean;
  isDeepThinkActive: boolean;
  setIsDeepThinkActive: () => void;
  deepThinkingShortcut?: string;
}

const InputControls = ({
  isChatMode,
  isDeepThinkActive,
  setIsDeepThinkActive,
  deepThinkingShortcut = "r",
}: InputControlsProps) => {
  const { t } = useTranslation();

  const renderButton = (
    icon: React.ReactNode,
    isActive: boolean,
    title: string,
    onClick?: () => void,
    shortcut?: string
  ) => (
    <button
      className={clsx(
        "flex items-center justify-center w-8 h-8 rounded-md transition-colors cursor-pointer",
        {
          "text-[#0072FF] bg-[rgba(0,114,255,0.1)]": isActive,
          "text-[#666] hover:bg-[#EDEDED] dark:text-[#999] dark:hover:bg-[#202126]": !isActive,
        }
      )}
      onClick={onClick}
      title={title}
    >
      {shortcut ? (
        <VisibleKey shortcut={shortcut} onKeyPress={onClick}>
          {icon}
        </VisibleKey>
      ) : (
        icon
      )}
    </button>
  );

  return (
    <div className="flex items-center pt-3 gap-4">
      {isChatMode && (
        <>
          {renderButton(
            <Telescope size={18} />,
            isDeepThinkActive,
            t("search.input.deepThink") || "DeepThink",
            setIsDeepThinkActive,
            deepThinkingShortcut
          )}
          {renderButton(<Globe size={18} />, false, t("search.input.search") || "Search")}
          {renderButton(<Hammer size={18} />, false, t("search.input.tools") || "Tools")}
        </>
      )}
    </div>
  );
};

export default InputControls;
