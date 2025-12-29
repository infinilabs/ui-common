import { useState } from "react";
import {
  FilterCheckboxGroup,
  FilterColorPicker,
  FilterInput,
  FilterSelect,
  FilterSlider,
  FilterTags,
} from "@infinilabs/filter";

let iconIndex = 100;

function App() {
  const [tagsValue, setTagsValue] = useState<Array<string | number>>([]);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<
    Array<string | number>
  >([]);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [inputValue, setInputValue] = useState<string>("");
  const [colorPickerValue, setColorPickerValue] = useState<string>();
  const [selectValue, setSelectValue] = useState<string>();

  const getIcon = () => {
    iconIndex++;

    return `https://picsum.photos/${iconIndex}`;
  };

  return (
    <div className="flex flex-col gap-4 w-80 m-auto">
      <FilterCheckboxGroup
        title="多选框"
        value={checkboxGroupValue}
        options={Array.from({ length: 15 }).map((_, index) => ({
          label: `选项${index + 1}`,
          value: `option${index + 1}`,
          icon: getIcon(),
          count: Math.floor(Math.random() * 100),
        }))}
        onChange={setCheckboxGroupValue}
        onClear={() => {
          setCheckboxGroupValue([]);
        }}
      />

      <FilterTags
        title="标签"
        value={tagsValue}
        options={[
          {
            label: "李文",
            value: "liwen",
          },
          {
            label: "张强",
            value: "zhangqiang",
          },
          {
            label: "王芳",
            value: "wangfang",
            icon: getIcon(),
          },
          {
            label: "Peter Quill",
            value: "peterquill",
          },
          {
            label: "王乐康",
            value: "wanglekang",
          },
          {
            label: "Wallis Bird",
            value: "wallisbird",
            icon: getIcon(),
          },
          {
            label: "李雷",
            value: "lilei",
          },
          {
            label: "韩梅梅",
            value: "hanmeimei",
            icon: getIcon(),
          },
          {
            label: "Tony Stark",
            value: "tonystark",
          },
          {
            label: "Bruce Wayne",
            value: "brucewayne",
            icon: getIcon(),
          },
          {
            label: "Diana Prince",
            value: "dianaprince",
          },
          {
            label: "Clark Kent",
            value: "clarkkent",
            icon: getIcon(),
          },
          {
            label: "Natasha Romanoff",
            value: "natasharomanoff",
            icon: getIcon(),
          },
          {
            label: "Steve Rogers",
            value: "steverogers",
            icon: getIcon(),
          },
          {
            label: "Bruce Banner",
            value: "brucebanner",
            icon: getIcon(),
          },
        ]}
        onChange={setTagsValue}
        onClear={() => {
          setTagsValue([]);
        }}
      />

      <FilterSlider
        title="滑块"
        value={sliderValue}
        onChange={setSliderValue}
        onClear={() => {
          setSliderValue(0);
        }}
      />

      <FilterInput
        title="输入框"
        value={inputValue}
        placeholder="输入框"
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onClear={() => {
          setInputValue("");
        }}
      />

      <FilterColorPicker
        title="颜色选择器"
        allowClear
        showText
        value={colorPickerValue}
        onChange={(value) => {
          setColorPickerValue(value.toRgbString());
        }}
        onClear={() => {
          setColorPickerValue(void 0);
        }}
      />

      <FilterSelect
        title="下拉选择框"
        value={selectValue}
        options={Array.from({ length: 10 }).map((_, index) => ({
          label: `选项${index + 1}`,
          value: `option${index + 1}`,
        }))}
        onChange={setSelectValue}
        onClear={() => {
          setSelectValue(void 0);
        }}
      />
    </div>
  );
}

export default App;
