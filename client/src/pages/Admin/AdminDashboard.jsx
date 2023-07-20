import {
  ClusterOutlined,
  UsergroupAddOutlined,
  CodeSandboxOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Switch } from "antd";
import { Col, Row } from "antd";
import { useState } from "react";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import Products from "./Products";
import AdminOrders from "./AdminOrders";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Create Category", "1", <ClusterOutlined />),
  getItem("Create Product", "2", <CodeSandboxOutlined />),
  getItem("Orders", "3", <UsergroupAddOutlined />),
  getItem("Products", "4", <DropboxOutlined />),
];
const AdminDashboard = () => {
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
          {active == 1 ? <CreateCategory /> : ""}
          {active == 2 ? <CreateProduct /> : ""}
          {active == 3 ? <AdminOrders /> : ""}
          {active == 4 ? <Products /> : ""}
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
export default AdminDashboard;
