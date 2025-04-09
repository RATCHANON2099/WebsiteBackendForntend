// src/App.jsx
import React from "react";
import FormUser from "./components/FormUser";
import { ConfigProvider } from "antd"; // ใช้ ConfigProvider สำหรับการตั้งค่าทั่วไปในแอป

function App() {
  return (
    <ConfigProvider>
      <div style={{ padding: "2rem" }}>
        <FormUser />
      </div>
    </ConfigProvider>
  );
}

export default App;
