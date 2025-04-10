import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // สร้างฟังก์ชัน navigate

  const handleGetStarted = () => {
    navigate("/login"); // ไปที่หน้า /login เมื่อคลิก
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white shadow-lg mb-6">
          Home
        </h1>
        <button
          onClick={handleGetStarted}
          className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;
