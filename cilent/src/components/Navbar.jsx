import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

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
        width: "100%", // ✅ ให้ container กว้างเต็ม
        backgroundColor: "#001529",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
    </div>
  );
};

export default Navbar;
