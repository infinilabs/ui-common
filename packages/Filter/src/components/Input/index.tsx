import { Input as AntdInput, type InputProps as AntdInputProps } from "antd";
import Collapse, { type CollapseProps } from "../Collapse";

export type InputProps = CollapseProps & AntdInputProps;

const Input = (props: InputProps) => {
  return (
    <Collapse {...props}>
      <div className="px-0.5 pb-0.5">
        <AntdInput {...props} />
      </div>
    </Collapse>
  );
};

export default Input;
