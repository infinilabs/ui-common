import type { FC } from "react";
import { theme } from "antd";
import Collapse, { type CollapseProps } from "../Collapse";
import { cn } from "../../utils/cn";

export interface TagOption {
  label: string;
  value: string | number;
  icon?: string;
}

export interface TagsProps extends CollapseProps {
  value: Array<string | number>;
  options: TagOption[];
  onChange?: (value: Array<string | number>) => void;
}

const Tags: FC<TagsProps> = (props) => {
  const { value: propsValue, options, onChange, ...rest } = props;

  const { token } = theme.useToken();

  console.log("token", token);

  const nameOptions = options.filter((item) => !item.icon);
  const iconOptions = options.filter((item) => item.icon);

  const handleClear = () => {
    onChange?.([]);
  };

  const handleChange = (value: string | number) => {
    if (propsValue.includes(value)) {
      onChange?.(propsValue.filter((v) => v !== value));
    } else {
      onChange?.([...propsValue, value]);
    }
  };

  return (
    <Collapse {...rest} onClear={handleClear}>
      <div className="flex flex-wrap gap-2">
        {nameOptions.map((item) => {
          const { label, value } = item;

          return (
            <div
              key={value}
              className={cn(
                "inline-flex items-center h-6 px-3 cursor-pointer b-default rounded-full hover:border-primary transition-colors",
                {
                  "border-primary bg-primary-bg": propsValue.includes(value),
                }
              )}
              onClick={() => {
                handleChange(value);
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {iconOptions.map((item) => {
          const { label, value, icon } = item;

          return (
            <div
              key={value}
              className={cn(
                "size-12 rounded-full overflow-hidden cursor-pointer b-default b-2 border-transparent hover:border-primary transition",
                {
                  "border-primary": propsValue.includes(value),
                }
              )}
              onClick={() => {
                handleChange(value);
              }}
            >
              <img src={icon} alt={label} className="size-full" />
            </div>
          );
        })}
      </div>
    </Collapse>
  );
};

export default Tags;
