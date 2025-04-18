// src/components/UpdateUserInfo.jsx
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";

const UpdateUserInfo = () => {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    phone: "",
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // รับ token จาก localStorage
      const res = await axios.patch(
        "http://localhost:5000/api/users/updateMe",
        userData,
        {
          headers: {
            authtoken: token, // ส่ง token ใน headers
          },
        }
      );

      notification.success({
        message: "Success",
        description: "Your information has been updated successfully.",
      });

      console.log(res.data);
    } catch (error) {
      console.error("Error updating user info", error);
      notification.error({
        message: "Error",
        description: "Failed to update your information.",
      });
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Update Your Information</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" required>
          <Input
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Item>
        <Form.Item label="Age" required>
          <Input
            name="age"
            value={userData.age}
            onChange={handleChange}
            placeholder="Enter your age"
          />
        </Form.Item>
        <Form.Item label="Phone" required>
          <Input
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
          />
        </Form.Item>
        <Form.Item label="ID" required>
          <Input
            name="id"
            value={userData.id}
            onChange={handleChange}
            placeholder="Enter your ID"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Info
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUserInfo;
