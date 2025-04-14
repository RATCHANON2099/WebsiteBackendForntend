import React from "react";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons"; // ✅ นำเข้าลูกศรชี้ลง
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "#001529",
        padding: "0 1rem",
      }}
    >
      <Menu
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onClick={(e) => navigate(e.key)}
        theme="dark"
        style={{ backgroundColor: "transparent", borderBottom: "none" }}
        overflowedIndicator={<DownOutlined />} // ✅ ใช้ลูกศรแทน ...
      >
        <Menu.Item key="/">Home</Menu.Item>
        <Menu.Item key="/data">Data</Menu.Item>
        <Menu.Item key="/login">Logout</Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
