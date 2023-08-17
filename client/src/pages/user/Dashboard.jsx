import {
  ClusterOutlined,
  UsergroupAddOutlined,
  CodeSandboxOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import { Col, Row } from "antd";
import { useState } from "react";
import Order from "./Order";
import Profile from "./Profile";
import WishlistItems from "./wishlistItems";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Profile", "1", <ClusterOutlined />),
  getItem("Orders", "2", <CodeSandboxOutlined />),
  getItem("Wishlist Items", "3", <HeartOutlined />),
];
const UserDashboard = () => {
  const [mode, setMode] = useState("inline");
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState(0);
  const changeMode = (value) => {
    setMode(value ? "vertical" : "inline");
  };
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick = (e) => {
    setActive(e.key);
  };
  return (
    <>
      {/* <Switch onChange={changeMode} /> Change Mode
      <Divider type="vertical" />
      <Switch onChange={changeTheme} /> Change Style */}

      <Row className="mt-5">
        <Col span={20} push={4}>
          {active == 1 ? <Profile /> : ""}
          {active == 2 ? <Order /> : ""}
          {active == 3 ? <WishlistItems /> : ""}
        </Col>
        <Col span={4} pull={20}>
          <Menu
            style={{
              width: "100%",
              height: "89vh",
            }}
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode={mode}
            theme={theme}
            items={items}
          />
        </Col>
      </Row>
    </>
  );
};
export default UserDashboard;
