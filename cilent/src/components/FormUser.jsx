//Function FormUser สำหรับโชว์ Form ที่หน้าเว็บ

import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormUser = () => {
  const [form] = Form.useForm(); // ใช้ form instance เพื่อควบคุมค่าในฟอร์ม

  const onFinish = (values) => {
    console.log("Form Data:", values);
  };

  return (
    <div style={styles.container}>
      <h1>User Form</h1>
      <Form
        form={form} // ผูกกับ form instance
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={styles.form}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "idNumber"]}
          label="ID Number"
          rules={[
            { required: true, message: "ID Number is required!" }, // เพิ่มข้อความเตือน
            {
              pattern: /^\d+$/, // ยอมรับเฉพาะตัวเลข
              message: "ID Number must contain only numbers", // ข้อความเตือนเมื่อไม่ใช่ตัวเลข
            },
          ]}
        >
          <Input
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                form.setFieldValue(["user", "idNumber"], value); // ยอมรับเฉพาะตัวเลข
              } else {
                form.setFieldValue(["user", "idNumber"], ""); // ล้างค่าถ้าไม่ใช่ตัวเลข
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name={["user", "phoneNumber"]}
          label="Phone Number"
          rules={[
            { required: true, message: "Phone Number is required!" }, // เพิ่มข้อความเตือน
            {
              pattern: /^\d+$/, // ยอมรับเฉพาะตัวเลข
              message: "Phone Number must contain only numbers", // ข้อความเตือนเมื่อไม่ใช่ตัวเลข
            },
          ]}
        >
          <Input
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                form.setFieldValue(["user", "phoneNumber"], value); // ยอมรับเฉพาะตัวเลข
              } else {
                form.setFieldValue(["user", "phoneNumber"], ""); // ล้างค่าถ้าไม่ใช่ตัวเลข
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[
            { required: true, message: "Age is required" },
            {
              type: "number",
              min: 0,
              max: 999,
              message: "Age must be a valid number between 0 and 999",
            },
          ]}
          labelCol={{ span: 8 }} // ตั้งค่า label ให้เท่ากับฟิลด์อื่น
          wrapperCol={{ span: 16 }} // ตั้งค่า wrapper ให้เท่ากับฟิลด์อื่น
        >
          <InputNumber
            min={0}
            max={999}
            onChange={(value) => {
              if (typeof value === "number") {
                form.setFieldValue(["user", "age"], value); // เซ็ตค่าเมื่อเป็นตัวเลข
              } else {
                form.setFieldValue(["user", "age"], ""); // ล้างค่าถ้าไม่ใช่ตัวเลข
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name={["user", "role"]}
          label="Role"
          rules={[
            { required: true },
            {
              pattern: /^[^0-9]+$/, // ห้ามมีตัวเลข
              message: "Role must not contain numbers", // ข้อความเตือนเมื่อมีตัวเลข
            },
          ]}
        >
          <Input
            onChange={(e) => {
              const value = e.target.value;
              if (/\d/.test(value)) {
                form.setFieldValue(["user", "role"], ""); // ล้างค่าถ้ามีตัวเลข
              } else {
                form.setFieldValue(["user", "role"], value); // เซ็ตค่าตามปกติ
              }
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// สไตล์ฟอร์มและกล่องกลางหน้า
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // ชิดบน
    alignItems: "center", // จัดกลางแนวนอน
    paddingTop: "50px",
    textAlign: "center", // จัดกลางข้อความ
  },
  form: {
    width: "400px", // กำหนดความกว้างฟอร์ม
    textAlign: "left",
    marginTop: "20px",
  },
};

export default FormUser;
