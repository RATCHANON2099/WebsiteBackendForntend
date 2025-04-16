import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <div
      style={{
        width: "100%", // ✅ ให้ container กว้างเต็ม
        backgroundColor: "#001529",
        padding: "0 1rem",
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
            width: "auto", // ✅ ไม่บังคับตัด
            overflow: "visible", // ✅ ไม่ซ่อน
          }}
        >
          <Menu.Item key="/">Home</Menu.Item>
          <Menu.Item key="/data">Data</Menu.Item>
          <Menu.Item key="/login">Logout</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
