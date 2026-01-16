import { type FC, type HTMLAttributes } from "react";
import { useKeyPress } from "ahooks";
import clsx from "clsx";

interface VisibleKeyProps extends HTMLAttributes<HTMLDivElement> {
  shortcut: string;
  rootClassName?: string;
  shortcutClassName?: string;
  onKeyPress?: () => void;
}

const VisibleKey: FC<VisibleKeyProps> = (props) => {
  const {
    shortcut,
    rootClassName,
    shortcutClassName,
    children,
    onKeyPress,
    ...rest
  } = props;

  useKeyPress(shortcut, (event) => {
    if (event.repeat) return;
    onKeyPress?.();
  });

  const renderShortcut = () => {
    if (shortcut === "leftarrow") return "←";
    if (shortcut === "rightarrow") return "→";
    if (shortcut === "enter") return "↩︎";
    if (shortcut === "backspace") return "⌫";
    return shortcut;
  };

  return (
    <div
      className={clsx("relative group", rootClassName)}
      {...rest}
    >
      {children}
      <div
        className={clsx(
          "absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50",
          shortcutClassName
        )}
      >
        {renderShortcut()}
      </div>
    </div>
  );
};

export default VisibleKey;
