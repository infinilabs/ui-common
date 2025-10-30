import { EntityCard, EntityLabel } from "@infinilabs/entity-ui";

const data = {
  type: "user",
  id: "user-zouwenan",
  icon: "user",
  title: "邹稳安",
  subtitle: "设计总监@产品创意部",
  status: "Online",
  url: "https://infinilabs.com",
  cover: "https://picsum.photos/seed/infinilabs/800/240",
  style: {
    width: "420px",
    max_height: "360px",
    cover_max_height: "160px",
  },
  categories: [
    { name: "部门", value: ["产品创意部", "设计组"] },
    { name: "技能", value: ["交互设计", "界面设计", "原型设计"] },
  ],
  tags: ["Creator", "Designer", "UI/UX", "Infinilabs"],
  properties: [
    { name: "Email", value: "zouwenan@infinilabs.com" },
    { name: "Phone", value: "+86 138 0000 0000" },
    { name: "Location", value: "Shanghai, China" },
  ],
  details: [
    {
      label: "简介",
      value: "在 Infinilabs 负责产品创意与设计工作，专注交互与用户体验。",
    },
    {
      label: "职责",
      value: "推进设计系统与组件库建设，提升多产品协同效率与一致性。",
    },
  ],
};

export default function DemoEntityUI() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      {/* 行内标签展示：EntityLabel */}
      <EntityLabel
        data={{
          type: "user",
          id: "user-zouwenan",
          icon: "user",
          title: "邹稳安",
          color: "#0f0f0f",
          subtitle: "设计总监@产品创意部",
          url: "mailto:zouwenan@infinilabs.com",
        }}
      />

      {/* 悬浮/点击弹出详情卡片：EntityCard */}
      <EntityCard
        title="个人信息"
        data={data}
        placement="right"
        triggerType="hover"
        autoPlacement
        hoverOpenDelay={300}
      />

      <EntityCard
        title=""
        triggerType="hover"
        hoverOpenDelay={500}
        autoPlacement
        data={{
          type: "user",
          id: "sdsddsd",
          icon: "mail",
          title: "eewqew",
          subtitle: "wewewew@infinilabs.com",
        }}
        trigger={<button className="entity-card__btn">用户1</button>}
      />
    </div>
  );
}
