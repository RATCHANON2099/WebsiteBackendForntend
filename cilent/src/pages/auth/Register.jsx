// src/pages/auth/Register.jsx
import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../functions/user";

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

  return (
    <div style={{ width: "400px", margin: "100px auto" }}>
      <h2>Register</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
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
  );
};

export default Register;
