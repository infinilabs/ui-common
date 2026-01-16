import {
  useState,
  type FC,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { motion } from "motion/react";
import { BrushCleaning, SquareMinus, SquarePlus } from "lucide-react";
import { cn } from "../../utils/cn";

export interface FilterCollapseProps extends PropsWithChildren {
  defaultExpand?: boolean;
  title: string;
  classNames?: {
    title?: string;
  };
  onClear?: (event: MouseEvent) => void;
}

const FilterCollapse: FC<FilterCollapseProps> = (props) => {
  const { defaultExpand, title, children, classNames, onClear } = props;
  const [expand, setExpand] = useState(defaultExpand ?? false);

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
        className={cn(
          "flex items-center justify-between cursor-pointer text-[#999]",
          classNames?.title
        )}
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          <div className="relative size-4 children:(absolute inset-0)">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: expand ? 0 : 1 }}
            >
              <SquarePlus className="size-4" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: expand ? 1 : 0 }}
            >
              <SquareMinus className="size-4" />
            </motion.div>
          </div>

          <span>{title}</span>
        </div>

        <BrushCleaning className="size-4" onClick={handleClear} />
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
