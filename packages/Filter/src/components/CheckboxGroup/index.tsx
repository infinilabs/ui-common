import { useState, type FC } from "react";
import { Checkbox } from "antd";
import { motion, AnimatePresence } from "motion/react";

import type { CollapseProps } from "../Collapse";
import Collapse from "../Collapse";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export interface CheckboxGroupOption {
  label: string;
  value: string | number;
  icon: string;
  count: number;
}

export interface CheckboxGroupProps extends CollapseProps {
  value: Array<string | number>;
  options: CheckboxGroupOption[];
  onChange?: (value: Array<string | number>) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const { options, value: propsValue, onChange, ...rest } = props;
  const [expandMore, setExpandMore] = useState(false);

  const renderOptions = (options: CheckboxGroupOption[]) => {
    return (
      <div className="flex flex-col gap-4">
        {options.map((item) => {
          const { label, value, icon, count } = item;

          return (
            <div key={value} className="flex items-center justify-between">
              <Checkbox
                checked={propsValue.includes(value)}
                onChange={(event) => {
                  const checked = event.target.checked;

                  if (checked) {
                    onChange?.([...propsValue, value]);
                  } else {
                    onChange?.(propsValue.filter((item) => item !== value));
                  }
                }}
              >
                <div className="flex items-center gap-1">
                  <img src={icon} alt={label} className="size-4" />

                  <span>{label}</span>
                </div>
              </Checkbox>

              <span>{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const handleExpandMore = () => {
    setExpandMore((prev) => !prev);
  };

  return (
    <Collapse {...rest}>
      {renderOptions(options.slice(0, 5))}

      <AnimatePresence>
        {expandMore && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4">{renderOptions(options.slice(5))}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {options.length > 5 && (
        <div
          className="inline-flex items-center mt-4 text-primary cursor-pointer"
          onClick={handleExpandMore}
        >
          <span>更多</span>

          <ChevronDown
            className={cn("size-4 transition", {
              "-scale-y-100": expandMore,
            })}
          />
        </div>
      )}
    </Collapse>
  );
};

export default CheckboxGroup;
