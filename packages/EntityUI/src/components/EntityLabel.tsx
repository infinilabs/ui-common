import React from "react";

import { EntityContent } from "./EntityContent";
import { EntityCardData } from "./types";

import styles from "./Entity.module.css";

export interface EntityLabelProps {
  data?: EntityCardData;
}

const EntityLabel: React.FC<EntityLabelProps> = ({ data }) => {
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
      <EntityContent data={data} />
    </div>
  );
};

export default EntityLabel;
