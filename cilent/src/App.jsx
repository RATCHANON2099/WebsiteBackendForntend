// src/App.jsx
import React, { useState } from "react";
import Login from "./pages/auth/Login";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import DataUser from "./pages/auth/DataUser";
import FormUser from "./pages/auth/FormUser";
import UpdateUserInfo from "./components/updateUserInfo";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register", "/"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {location.pathname === "/" ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <div style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/datauser" element={<DataUser />} />
            <Route path="/edit/:userId" element={<FormUser />} />
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
