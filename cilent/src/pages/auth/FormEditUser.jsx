import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../../functions/user";
import { Form, Input, Button, message, Layout, PageHeader } from "antd";

const { Content } = Layout;

const FormEditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    age: "",
    id_number: "",
    phone_number: "",
    role: "",
  });

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = async (id) => {
    try {
      const res = await read(id);
      setData(res.data);
    } catch (err) {
      console.log("Error loading data:", err);
      message.error("Failed to load user data");
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ห้ามรีเฟรชหน้าเมื่อ submit
    try {
      const res = await update(params.id, data); // เรียก API update
      if (res) {
        message.success("User updated successfully");
        navigate("/data"); // พาไปหน้ารายชื่อข้อมูลผู้ใช้หลังจากอัพเดทสำเร็จ
      } else {
        message.error("Update failed");
      }
    } catch (err) {
      console.log("Error during update:", err);
      message.error("Failed to update user");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px 50px", background: "#f0f2f5" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PageHeader
            className="site-page-header"
            title="Edit User"
            onBack={() => navigate("/data")}
            subTitle="Update user information"
            style={{ background: "#001529", color: "#fff" }}
          />
          <Form
            layout="vertical"
            onSubmitCapture={handleSubmit} // ใช้ onSubmitCapture แทน onFinish
            initialValues={data}
            style={{ marginTop: "30px" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input
                name="name"
                onChange={handleChange}
                placeholder="Enter name"
                value={data.name}
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please input the age!" }]}
            >
              <Input
                name="age"
                onChange={handleChange}
                placeholder="Enter age"
                value={data.age}
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="ID Number"
              name="id_number"
              rules={[
                { required: true, message: "Please input the ID number!" },
              ]}
            >
              <Input
                name="id_number"
                onChange={handleChange}
                placeholder="Enter ID Number"
                value={data.id_number}
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <Input
                name="phone_number"
                onChange={handleChange}
                placeholder="Enter phone number"
                value={data.phone_number}
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Input
                name="role"
                onChange={handleChange}
                placeholder="Enter role"
                value={data.role}
                style={{ borderRadius: "5px" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#1890ff",
                  borderRadius: "5px",
                  fontSize: "16px",
                  height: "40px",
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default FormEditUser;
