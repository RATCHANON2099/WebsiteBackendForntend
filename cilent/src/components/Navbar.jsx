import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;
  const { SubMenu } = Menu;

  // ดึงข้อมูล user จาก localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name?.trim() || "USER";

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
      }}
    >
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "60px",
              maxWidth: "auto",
              objectFit: "contain",
              marginTop: "5px",
              marginLeft: "1px",
              marginBottom: "5px",
            }}
          />
        </Link>
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onClick={(e) => navigate(e.key)}
        theme="dark"
        style={{
          backgroundColor: "transparent",
          borderBottom: "none",
          display: "flex",
          justifyContent: "flex-end",
          flexGrow: 1,
        }}
      >
        <Menu.Item key="/">Home</Menu.Item>

        {/* SUBMENU */}
        <SubMenu
          key="submenu"
          title={
            <span>
              {userName} <DownOutlined />
            </span>
          }
        >
          <Menu.Item key="/data">Data</Menu.Item>
          <Menu.Item key="/login">Logout</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Navbar;
