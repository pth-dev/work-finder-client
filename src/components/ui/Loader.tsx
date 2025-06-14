import React from "react";
import { Progress } from "antd";

// styles
const loaderWrapperStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
  backgroundColor: "transparent",
};

// ==============================|| LOADER ||============================== //

const Loader: React.FC = () => (
  <div style={loaderWrapperStyle}>
    <Progress
      percent={100}
      showInfo={false}
      status="active"
      strokeColor={{
        "0%": "#1890ff",
        "100%": "#52c41a",
      }}
      size="small"
    />
  </div>
);

export default Loader;
