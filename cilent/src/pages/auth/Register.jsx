import React from "react";
import { Form, Input, Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../functions/user";
import { DownOutlined } from "@ant-design/icons"; // ✅ ลูกศรชี้ลง

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (value) => {
    register(value)
      .then((res) => {
        console.log("Register Success", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Register Error", err);
      });
  };

  // Navbar
  const location = window.location.pathname;
  const selectedKey = location;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "#001529",
          padding: "0 1rem",
          display: "flex",
          justifyContent: "flex-end", // 👉 ปุ่มอยู่ขวา
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={(e) => navigate(e.key)}
          theme="dark"
          style={{
            backgroundColor: "transparent",
            borderBottom: "none",
          }}
          overflowedIndicator={<DownOutlined />}
        >
          <Menu.Item key="/">Home</Menu.Item>
        </Menu>
      </div>

      {/* Form */}
      <div style={{ width: "400px", margin: "120px auto" }}>
        <h2>Register</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Button block onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Register;
