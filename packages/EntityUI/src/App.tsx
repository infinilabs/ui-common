import { EntityCard, EntityLabel, EntityUser } from "./components/index";
import {
  data,
  labelData,
  labelData2,
  user_icon_title,
  user_only_icon,
  user_only_title,
  user_icon_title_url,
  user_icon_title_color_subtitle,
  user_1,
  user_2,
} from "./data";

function App() {
  return (
    <div>
      <div style={{ position: "relative", height: "100vh", padding: 24 }}>
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <EntityCard
            title=""
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
            triggerType="hover"
            hoverOpenDelay={500}
            autoPlacement
            data={data}
            trigger={<button className="entity-card__btn">右下角</button>}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <EntityCard
            title=""
            triggerType="hover"
            hoverOpenDelay={500}
            autoPlacement
            data={data}
            trigger={<button className="entity-card__btn">底部中间</button>}
          />
        </div>
      </div>

      {/* <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}
      >
        <EntityCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={user_1}
          trigger={<button className="entity-card__btn">用户1</button>}
        />
        <EntityCard
          title=""
          triggerType="hover"
          hoverOpenDelay={500}
          autoPlacement
          data={user_2}
          trigger={<button className="entity-card__btn">用户2</button>}
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 24,
          }}
        >
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

      <div
        style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}
      >
        <EntityLabel data={data} />
        <EntityLabel data={labelData} />
        <EntityLabel data={labelData2} />
      </div> */}


      
    </div>
  );
}

export default App;
