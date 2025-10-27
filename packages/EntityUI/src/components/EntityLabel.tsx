import { EntityContent } from "./EntityContent";
import { EntityUser } from "./EntityUser";
import { EntityCardData } from "./types";

import styles from "./Entity.module.css";

export interface EntityLabelProps {
  data?: EntityCardData;
}

function EntityLabel({ data }: EntityLabelProps) {

  const isUser = (data?.type ?? "").toLowerCase() === "user";

  return (
    <div
      className={styles.entityLabel}
      style={{
        width: data?.style?.width,
        height: data?.style?.height,
        maxWidth: data?.style?.max_width,
        maxHeight: data?.style?.max_height,
      }}
    >
      {data?.id ? isUser ? (
            <EntityUser data={data as any} />
        ) : (
            <EntityContent data={data} />
        ) : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            verticalAlign: "middle",
          }}
          aria-label="entity label skeleton"
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "#e9e9e9",
              flex: "0 0 auto",
            }}
          />
          <span
            style={{
              width: 160,
              height: 20,
              borderRadius: 6,
              backgroundColor: "#e9e9e9",
              flex: "0 0 auto",
            }}
          />
        </span>
      )}
    </div>
  );
}

export default EntityLabel;
