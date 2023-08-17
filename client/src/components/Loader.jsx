import React from "react";
import { Space, Spin } from "antd";

const Loader = () => {
  return (
    <Space
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
      size="middle"
    >
      <Spin size="large" />
    </Space>
  );
};

export default Loader;
