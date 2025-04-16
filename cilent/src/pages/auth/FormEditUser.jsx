import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../../functions/user";
import { Form, Input, Button, message, Layout } from "antd";

const { Content } = Layout;

const FormEditUser = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // ใช้เช็กว่ากำลังโหลด

  useEffect(() => {
    loadData(params.id);
  }, [params.id]);

  const loadData = async (id) => {
    try {
      const res = await read(id);
      if (res.data) {
        form.setFieldsValue(res.data); // กรอกข้อมูลที่มีอยู่ลงฟอร์ม
      }
    } catch (err) {
      console.error("Error loading data:", err);
      message.error("Failed to load user data");
    } finally {
      setLoading(false); // รอให้โหลดเสร็จก่อนแสดงฟอร์ม
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = form.getFieldsValue(); // ดึงค่าจากฟอร์ม
      const res = await update(params.id, values);
      if (res) {
        message.success("User updated successfully");
        navigate("/data");
      } else {
        message.error("Update failed");
      }
    } catch (err) {
      console.error("Error during update:", err);
      message.error("Failed to update user");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              background: "#001529",
              borderRadius: "8px",
              padding: "24px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                background: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "36px",
                fontWeight: "bold",
                margin: 0,
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                letterSpacing: "1.5px",
              }}
            >
              FORM
            </h1>
          </div>

          {!loading && (
            <Form form={form} layout="vertical" onSubmitCapture={handleSubmit}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>

              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: "Please input the age!" }]}
              >
                <Input placeholder="Enter age" />
              </Form.Item>

              <Form.Item
                name="id_number"
                label="ID Number"
                rules={[
                  { required: true, message: "Please input the ID number!" },
                ]}
              >
                <Input placeholder="Enter ID Number" />
              </Form.Item>

              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please input the phone number!" },
                ]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>

              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please input the role!" }]}
              >
                <Input placeholder="Enter role" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ fontSize: "16px", height: "40px" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default FormEditUser;
