import { useState } from "react";

import { EntityCard, EntityCardProps, EntityLabel } from "./components/index";
import { data, labelData, labelData2 } from "./data";
import { EntityUser } from "./components";
import {
  user_icon_title,
  user_only_icon,
  user_only_title,
  user_icon_title_url,
  user_icon_title_color_subtitle,
} from "./data";

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
      <EntityLabel data={labelData2} />
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>icon+标题</div>
          <EntityUser data={user_icon_title} />
        </div>
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>icon</div>
          <EntityUser data={user_only_icon} />
        </div>
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>标题</div>
          <EntityUser data={user_only_title} />
        </div>
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>icon+标题+url</div>
          <EntityUser data={user_icon_title_url} />
        </div>
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>颜色+icon+标题</div>
          <EntityUser data={user_icon_title_color_subtitle} />
        </div>
      </div>
    </div>
  );
}

export default App;
