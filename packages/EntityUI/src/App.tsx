import { useState } from "react";

import { EntityCard, EntityCardProps, EntityLabel } from "./components/index";
import { data, labelData } from "./data";

function App() {
  const [count, setCount] = useState(0);

  const cardProps: EntityCardProps = {
    title: "物理卡片",
    subtitle: "子标题",
    description:
      "这是一个演示用的业务组件模板，支持图片、标题、描述和操作按钮。",
    imageUrl: "https://via.placeholder.com/640x360",
    actions: [
      { label: "增加", onClick: () => setCount((c) => c + 1) },
      { label: "重置", onClick: () => setCount(0) },
    ],
    footer: `计数：${count}`,
  };

  return (
    <div style={{ position: "relative", height: "80vh", padding: 24 }}>
      <EntityLabel data={data} />
      <EntityLabel data={labelData} />
      <div style={{ position: "absolute", top: 12, left: 12 }}>
        <EntityCard
          title=""
          subtitle="子标题"
          description="这是一个演示用的业务组件模板，支持图片、标题、描述和操作按钮。"
          imageUrl="https://via.placeholder.com/640x360"
          actions={[
            { label: "增加", onClick: () => setCount((c) => c + 1) },
            { label: "重置", onClick: () => setCount(0) },
          ]}
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="entity-card__btn">左上角</button>}
        />
      </div>

      <div style={{ position: "absolute", top: 12, right: 12 }}>
        <EntityCard
          title=""
          subtitle="子标题"
          description="这是一个演示用的业务组件模板，支持图片、标题、描述和操作按钮。"
          imageUrl="https://via.placeholder.com/640x360"
          actions={[
            { label: "增加", onClick: () => setCount((c) => c + 1) },
            { label: "重置", onClick: () => setCount(0) },
          ]}
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="entity-card__btn">右上角</button>}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <EntityCard
          title=""
          subtitle="子标题"
          description="这是一个演示用的业务组件模板，支持图片、标题、描述和操作按钮。"
          imageUrl="https://via.placeholder.com/640x360"
          actions={[
            { label: "增加", onClick: () => setCount((c) => c + 1) },
            { label: "重置", onClick: () => setCount(0) },
          ]}
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="entity-card__btn">页面中间</button>}
        />
      </div>

      <div style={{ position: "absolute", bottom: 12, left: 12 }}>
        <EntityCard
          title=""
          subtitle="子标题"
          description="这是一个演示用的业务组件模板，支持图片、标题、描述和操作按钮。"
          imageUrl="https://via.placeholder.com/640x360"
          actions={[
            { label: "增加", onClick: () => setCount((c) => c + 1) },
            { label: "重置", onClick: () => setCount(0) },
          ]}
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="entity-card__btn">左下角</button>}
        />
      </div>

      <div style={{ position: "absolute", bottom: 12, right: 12 }}>
        <EntityCard
          title=""
          subtitle="子标题"
          description="这是一个演示用的业务组件模板，支持图片、标题、描述和操作按钮。"
          imageUrl="https://via.placeholder.com/640x360"
          actions={[
            { label: "增加", onClick: () => setCount((c) => c + 1) },
            { label: "重置", onClick: () => setCount(0) },
          ]}
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={data}
          trigger={<button className="entity-card__btn">右下角</button>}
        />
      </div>
    </div>
  );
}

export default App;
