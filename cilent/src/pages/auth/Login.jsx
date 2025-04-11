// src/components/Login.jsx
import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = () => {
    // เมื่อกดปุ่ม Login เรียก onLoginSuccess เพื่อเปลี่ยนไปที่หน้า FormUser
    console.log("Login successful");
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2></h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
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
            LOGIN
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block onClick={() => navigate("/register")}>
            REGISTER
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
