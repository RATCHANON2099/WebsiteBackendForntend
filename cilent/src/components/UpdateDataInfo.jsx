// src/components/UpdateDataInfo.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Layout, Spin } from "antd"; // เพิ่ม Spin สำหรับ loading
import { useNavigate, useParams } from "react-router-dom"; // เพิ่ม useParams
import { updateEmployee, getEmployeeById } from "../functions/employee"; // เพิ่ม getEmployeeById

const UpdateDataInfo = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // ดึง id จาก URL parameter
  const { Content } = Layout;
  const [loading, setLoading] = useState(false); // State สำหรับ loading ตอนดึงข้อมูล

  // useEffect สำหรับตรวจสอบ token และดึงข้อมูลเดิม
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("กรุณาเข้าสู่ระบบก่อน");
      navigate("/login");
      return; // ออกจาก useEffect ถ้าไม่มี token
    }

    // ฟังก์ชันสำหรับดึงข้อมูลพนักงานตาม id
    const fetchEmployeeData = async () => {
      setLoading(true); // เริ่ม loading
      try {
        const res = await getEmployeeById(id, token);
        if (res.data) {
          // เติมข้อมูลที่ได้ลงในฟอร์ม
          form.setFieldsValue(res.data);
        } else {
          message.error("ไม่พบข้อมูลพนักงานที่ต้องการแก้ไข");
          navigate("/datauser"); // กลับไปหน้า data ถ้าไม่เจอข้อมูล
        }
      } catch (error) {
        console.error("Error fetching employee data for update:", error);
        message.error("เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน");
        navigate("/datauser"); // กลับไปหน้า data ถ้าดึงข้อมูลไม่ได้
      } finally {
        setLoading(false); // หยุด loading
      }
    };

    if (id) {
      // ตรวจสอบว่ามี id ก่อนเรียก fetch
      fetchEmployeeData();
    } else {
      message.error("ไม่พบ ID ของข้อมูลที่ต้องการแก้ไข");
      navigate("/datauser"); // กลับไปหน้า data ถ้าไม่มี id ใน URL
    }

    // Cleanup function (ไม่จำเป็นในกรณีนี้ แต่เป็น good practice)
    // return () => {};
  }, [id, navigate, form]); // Dependencies: id, navigate, form

  // ฟังก์ชัน onFinish สำหรับการอัปเดตข้อมูล
  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem("token");

      // ตรวจสอบ token อีกครั้ง (เผื่อหมดอายุระหว่างใช้งาน)
      if (!token) {
        message.error("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
        navigate("/login");
        return;
      }

      // *** เรียกใช้ updateEmployee ***
      // ส่ง id, ข้อมูลจากฟอร์ม (values), และ token
      await updateEmployee(id, values, token);

      message.success("อัปเดตข้อมูลสำเร็จ");
      // form.resetFields(); // ปกติการอัปเดตไม่ต้อง reset ฟอร์ม
      navigate(`/datauser`); // กลับไปหน้าแสดงข้อมูล
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูลพนักงาน:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "เกิดข้อผิดพลาดในการอัปเดตข้อมูล";
      message.error(errorMessage);
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
        <Spin spinning={loading}>
          {" "}
          {/* แสดง Spin ขณะ loading */}
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
                  background:
                    "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: 0,
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
                  letterSpacing: "1.5px",
                }}
              >
                UPDATE DATA INFOMATION {/* เปลี่ยนหัวข้อ */}
              </h1>
            </div>

            <Form form={form} onFinish={onFinish} layout="vertical">
              {/* ฟอร์มเหมือนเดิม แต่ค่าจะถูกเติมจาก useEffect */}
              <Form.Item
                label="อีเมล (ติดต่อ)"
                name="email"
                rules={[
                  { required: true, message: "กรุณากรอก email" },
                  { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
                ]}
              >
                <Input placeholder="example@email.com" />
              </Form.Item>

              <Form.Item
                label="ชื่อ-นามสกุล"
                name="name"
                rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล" }]}
              >
                <Input placeholder="กรอกชื่อ-นามสกุล" />
              </Form.Item>

              <Form.Item
                label="อายุ"
                name="age"
                rules={[{ required: true, message: "กรุณากรอกอายุ" }]}
              >
                <Input placeholder="กรอกอายุ" type="number" />
              </Form.Item>

              <Form.Item
                label="เบอร์โทรศัพท์"
                name="phone_number"
                rules={[{ required: true, message: "กรุณากรอกเบอร์โทร" }]}
              >
                <Input placeholder="กรอกเบอร์โทรศัพท์" />
              </Form.Item>

              <Form.Item
                label="เลขบัตรประชาชน"
                name="id_number"
                rules={[{ required: true, message: "กรุณากรอกเลขบัตรประชาชน" }]}
              >
                <Input placeholder="กรอกเลขบัตรประชาชน" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ fontSize: "16px", height: "40px" }}
                  loading={loading} // แสดง loading บนปุ่มตอน submit (ถ้าต้องการ)
                >
                  อัปเดตข้อมูล {/* เปลี่ยนข้อความปุ่ม */}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </Content>
    </Layout>
  );
};

export default UpdateDataInfo;
