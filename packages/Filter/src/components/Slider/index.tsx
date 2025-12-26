import { Slider as AntdSlider } from "antd";
import type { CollapseProps } from "../Collapse";
import type { ComponentProps, FC } from "react";
import Collapse from "../Collapse";

export type SliderProps = CollapseProps & ComponentProps<typeof AntdSlider>;

const Slider: FC<SliderProps> = (props) => {
  return (
    <Collapse {...props}>
      <div className="px-2">
        <AntdSlider {...props} />
      </div>
    </Collapse>
  );
};

export default Slider;
