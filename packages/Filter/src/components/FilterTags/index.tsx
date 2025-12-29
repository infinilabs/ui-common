import type { FC } from "react";
import FilterCollapse, { type FilterCollapseProps } from "../FilterCollapse";
import { cn } from "../../utils/cn";

export interface FilterTagOption {
  label: string;
  value: string | number;
  icon?: string;
}

export interface FilterTagsProps extends FilterCollapseProps {
  value: Array<string | number>;
  options: FilterTagOption[];
  onChange?: (value: Array<string | number>) => void;
}

const FilterTags: FC<FilterTagsProps> = (props) => {
  const { value: propsValue, options, onChange, ...rest } = props;

  const nameOptions = options.filter((item) => !item.icon);
  const iconOptions = options.filter((item) => item.icon);

  const handleChange = (value: string | number) => {
    if (propsValue.includes(value)) {
      onChange?.(propsValue.filter((v) => v !== value));
    } else {
      onChange?.([...propsValue, value]);
    }
  };

  return (
    <FilterCollapse {...rest}>
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
                "size-12 rounded-full overflow-hidden cursor-pointer b-default b-2 border-transparent hover:border-primary transition-colors",
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
    </FilterCollapse>
  );
};

export default FilterTags;
