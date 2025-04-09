// src/App.jsx
import React, { useState } from "react";
import FormUser from "./components/FormUser"; // สมมติว่าคุณมี FormUser อยู่แล้ว
import Login from "./components/Login"; // นำเข้า Login component
import { ConfigProvider } from "antd";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ใช้สถานะในการเช็คการล็อกอิน

  // ฟังก์ชันที่เรียกใช้เมื่อกดปุ่ม Login
  const onLoginSuccess = () => {
    setIsLoggedIn(true); // เปลี่ยนสถานะให้เข้าสู่หน้า FormUser
  };

  return (
    <ConfigProvider>
      <div style={{ padding: "2rem" }}>
        {!isLoggedIn ? (
          <Login onLoginSuccess={onLoginSuccess} /> // เรียกใช้ Login component
        ) : (
          <FormUser />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
