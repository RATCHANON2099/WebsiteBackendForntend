//สร้างไฟล์ auth.js ในโฟลเดอร์ Routes เพื่อใช้ในการจัดการเส้นทางของ API ที่เกี่ยวข้องกับการตรวจสอบสิทธิ์ (Authentication)

const express = require("express");
const router = express.Router(); //สร้างตัวแปร router เพื่อใช้ในการทำงานของ express.Router()

const { register, login, checkEmail } = require("../Controllers/auth");

//http://localhost:5000/api/auth
router.post("/register", register);
router.post("/login", login);
router.get("/checkEmail", checkEmail);

module.exports = router; //ส่ง router ออกไปใช้งานในไฟล์อื่นๆ
