import {
  Select as AntdSelect,
  type SelectProps as AntdSelectProps,
} from "antd";
import Collapse, { type CollapseProps } from "../Collapse";
import type { FC } from "react";

export type SelectProps = CollapseProps & AntdSelectProps;

const Select: FC<SelectProps> = (props) => {
  return (
    <Collapse {...props}>
      <div className="px-0.5 pb-0.5">
        <AntdSelect className="w-full" {...props} />
      </div>
    </Collapse>
  );
};

export default Select;
