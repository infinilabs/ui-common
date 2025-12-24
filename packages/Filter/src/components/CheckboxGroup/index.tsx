import { type FC } from "react";
import { Checkbox } from "antd";

import type { CollapseProps } from "../Collapse";
import Collapse from "../Collapse";

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

  const handleClear = () => {
    onChange?.([]);
  };

  return (
    <Collapse {...rest} onClear={handleClear}>
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
    </Collapse>
  );
};

export default CheckboxGroup;
