import React from "react";
import { Spin, Typography, Flex } from "antd";

const { Text } = Typography;

export function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin />
    </div>
  );
}