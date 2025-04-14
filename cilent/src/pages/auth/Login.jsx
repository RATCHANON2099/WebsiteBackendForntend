// src/components/Login.jsx
import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      // เรียก backend /login
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        values
      );

      const user = res.data.user; // { id, name, email }
      const token = res.data.token;

      // บันทึกข้อมูลลง localStorage เผื่อใช้ภายหลัง
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      message.success("Login Success");

      // ไปหน้า /edit/:id
      navigate(`/edit/${user.id}`);
    } catch (err) {
      console.error("Login Error", err);
      message.error("Invalid email or password");
    }
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
