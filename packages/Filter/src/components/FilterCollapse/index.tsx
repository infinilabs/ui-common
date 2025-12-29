import {
  useState,
  type FC,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";

export interface FilterCollapseProps extends PropsWithChildren {
  defaultExpand?: boolean;
  title: string;
  onClear?: (event: MouseEvent) => void;
}

const FilterCollapse: FC<FilterCollapseProps> = (props) => {
  const { defaultExpand, title, children, onClear } = props;
  const [expand, setExpand] = useState(defaultExpand ?? false);
  const ExpandIcon = (LucideIcons as any).SquarePlus;
  const CollapseIcon = (LucideIcons as any).SquareMinus;
  const ClearIcon =
    (LucideIcons as any).BrushCleaning ??
    (LucideIcons as any).Eraser ??
    (LucideIcons as any).Trash2 ??
    (LucideIcons as any).X;

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation();

    onClear?.(event);
  };

  return (
    <div className="text-sm">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          <div className="relative size-4 children:(absolute inset-0)">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: expand ? 0 : 1 }}
            >
              {ExpandIcon ? <ExpandIcon className="size-4" /> : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: expand ? 1 : 0 }}
            >
              {CollapseIcon ? <CollapseIcon className="size-4" /> : null}
            </motion.div>
          </div>

          <span>{title}</span>
        </div>

        {ClearIcon ? <ClearIcon className="size-4" onClick={handleClear} /> : null}
      </div>

      <motion.div
        initial={{
          height: 0,
          opacity: 0,
        }}
        animate={{
          height: expand ? "auto" : 0,
          opacity: expand ? 1 : 0,
        }}
        className="overflow-hidden"
      >
        <div className="pt-4">{children}</div>
      </motion.div>
    </div>
  );
};

export default FilterCollapse;
