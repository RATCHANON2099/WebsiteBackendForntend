// src/App.jsx
import React, { useState } from "react";
import FormUser from "./components/FormUser"; // สมมติว่าคุณมี FormUser อยู่แล้ว from "./components/FormUser";
import Login from "./pages/auth/Login"; // สมมติว่าคุณมี Login อยู่แล้ว
import "antd/dist/antd.css"; // นำเข้า CSS ของ Ant Design
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Data from "./pages/Data";
import FormEditUser from "./pages/auth/FormEditUser";
import Navbar from "./components/Navbar";

// 👉 Wrapper สำหรับใช้ location ใน BrowserRouter

function AppWrapper() {
  //JavaScript
  const location = useLocation();

  // 👉 path ที่ไม่ต้องการให้มี Navbar
  const hideNavbarPaths = ["/login", "/register", "/"];

  // ตรวจสอบว่า path ปัจจุบันอยู่ในรายการที่ซ่อนไว้ไหม
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    //HTML
    <>
      {!shouldHideNavbar && <Navbar />}

      {/* ✅ ซ่อน padding เฉพาะหน้า Home */}
      {location.pathname === "/" ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <div style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/form" element={<FormUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/data" element={<Data />} />
            <Route path="/edit/:id" element={<FormEditUser />} />
          </Routes>
        </div>
      )}
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
