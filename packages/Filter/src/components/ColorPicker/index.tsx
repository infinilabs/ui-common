import type { FC } from "react";
import {
  ColorPicker as AntdColorPicker,
  type ColorPickerProps as AntdColorPickerProps,
} from "antd";
import Collapse, { type CollapseProps } from "../Collapse";

export type ColorPickerProps = CollapseProps & AntdColorPickerProps;

const ColorPicker: FC<ColorPickerProps> = (props) => {
  return (
    <Collapse {...props}>
      <AntdColorPicker {...props} />
    </Collapse>
  );
};

export default ColorPicker;
