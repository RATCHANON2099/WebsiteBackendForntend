//สร้างไฟล์ auth.js ในโฟลเดอร์ Routes เพื่อใช้ในการจัดการเส้นทางของ API ที่เกี่ยวข้องกับการตรวจสอบสิทธิ์ (Authentication)

const express = require("express");
const router = express.Router(); //สร้างตัวแปร router เพื่อใช้ในการทำงานของ express.Router()

//http://localhost:5000/api/auth
router.get("/auth", (req, res) => {
  res.send("Hello auth Endpoint"); //ส่งข้อความ Hello Product กลับไปยัง client
});

module.exports = router; //ส่ง router ออกไปใช้งานในไฟล์อื่นๆ
