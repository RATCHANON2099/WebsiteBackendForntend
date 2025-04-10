// src/App.jsx
import React, { useState } from "react";
import FormUser from "./components/FormUser"; // สมมติว่าคุณมี FormUser อยู่แล้ว from "./components/FormUser";
import Login from "./pages/auth/Login"; // สมมติว่าคุณมี Login อยู่แล้ว
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ใช้สถานะในการเช็คการล็อกอิน

  // ฟังก์ชันที่เรียกใช้เมื่อกดปุ่ม Login
  const onLoginSuccess = () => {
    setIsLoggedIn(true); // เปลี่ยนสถานะให้เข้าสู่หน้า FormUser
  };

  return (
    <BrowserRouter>
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/form" element={<FormUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
