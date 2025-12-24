import { useState } from "react";
import CheckboxGroup from "./components/CheckboxGroup";
import Tags from "./components/Tags";

const App = () => {
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<
    Array<string | number>
  >([]);
  const [tagsValue, setTagsValue] = useState<Array<string | number>>([]);

  return (
    <div className="flex flex-col gap-4 w-80 m-auto">
      <CheckboxGroup
        title="多选框"
        value={checkboxGroupValue}
        options={[
          {
            label: "选项1",
            value: "option1",
            icon: "https://picsum.photos/100",
            count: 10,
          },
          {
            label: "选项2",
            value: "option2",
            icon: "https://picsum.photos/101",
            count: 20,
          },
          {
            label: "选项3",
            value: "option3",
            icon: "https://picsum.photos/102",
            count: 30,
          },
        ]}
        onChange={setCheckboxGroupValue}
      />

      <Tags
        title="人员"
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
            icon: "https://picsum.photos/103",
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
            icon: "https://picsum.photos/105",
          },
          {
            label: "李雷",
            value: "lilei",
          },
          {
            label: "韩梅梅",
            value: "hanmeimei",
            icon: "https://picsum.photos/106",
          },
          {
            label: "Tony Stark",
            value: "tonystark",
          },
          {
            label: "Bruce Wayne",
            value: "brucewayne",
            icon: "https://picsum.photos/107",
          },
          {
            label: "Diana Prince",
            value: "dianaprince",
          },
          {
            label: "Clark Kent",
            value: "clarkkent",
            icon: "https://picsum.photos/108",
          },
          {
            label: "Natasha Romanoff",
            value: "natasharomanoff",
            icon: "https://picsum.photos/109",
          },
          {
            label: "Steve Rogers",
            value: "steverogers",
            icon: "https://picsum.photos/110",
          },
          {
            label: "Bruce Banner",
            value: "brucebanner",
            icon: "https://picsum.photos/111",
          },
        ]}
        onChange={setTagsValue}
      />
    </div>
  );
};

export default App;
