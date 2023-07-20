import {
  HomeTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Input } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import SearchInput from "../Form/SearchInput";
import axios from "axios";

const Header = () => {
  const { Search } = Input;
  const data = useSelector((state) => state.user);
  const [current, setCurrent] = useState();
  const [logo, setLogo] = useState([]);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  useEffect(() => {
    getStrapiLogoContent();
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <a
          href={`/dashboard/${data?.user?.user?.role === 1 ? "admin" : "user"}`}
        >
          Dasboard
        </a>
      ),
    },
    {
      key: "2",
      label: <a href="/cart">Cart</a>,
    },
    {
      key: "3",
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];

  const getStrapiLogoContent = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_STRAPI_API}/api/main-logo?populate=*`
      );
      console.log("menu data", data);
      setLogo(data.data.attributes.logo.data.attributes);
    } catch (error) {}
  };

  console.log(data);
  return (
    <>
      <Menu
        className="fixed-top"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="home" style={{ width: 200 }}>
          {/* <img
            src={`${import.meta.env.VITE_STRAPI_API}${logo.url}`}
            style={{ width: "2%" }}
          /> */}
          <span>
            <Link to="/">
              {" "}
              <img
                src={`${import.meta.env.VITE_STRAPI_API}${logo.url}`}
                style={{ width: "100%" }}
              />
            </Link>
          </span>
        </Menu.Item>
        <Menu.Item key="search" style={{ marginLeft: "auto", marginTop: 5 }}>
          <SearchInput />
        </Menu.Item>
        <Menu.Item key="products">
          <Link to="/all-products">All Products</Link>
        </Menu.Item>
        <Menu.Item key="categories">
          <Link to="/categories">All Categories</Link>
        </Menu.Item>

        {data.user.user ? (
          <>
            <Menu.Item key="user" icon={<UserOutlined />}>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {data.user.user.name}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
      <Outlet />
    </>
  );
};
export default Header;
