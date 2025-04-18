// Routes/employee.js
const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");

const {
  addEmployee,
  getEmployeeById, // *** ใช้ Controller ที่แก้ไขแล้ว ***
  updateEmployee,
  deleteEmployee,
  getDataEmployee,
} = require("../Controllers/employee");

// ✅ ดึงข้อมูล Employee ของ User ที่ Login อยู่
router.get("/employee/me", auth, getDataEmployee); // ถูกต้อง

// ✅ ดึงข้อมูล Employee ด้วย ID ที่ระบุ (สำหรับหน้า Edit)
router.get("/employee/:id", auth, getEmployeeById); // *** แก้ให้เรียก Controller ที่ถูกต้อง ***

// ✅ พนักงานเพิ่มข้อมูลของตัวเอง
router.post("/employee", auth, addEmployee); // *** เพิ่ม auth middleware ***

// ✅ พนักงานแก้ไขข้อมูลของตัวเอง
router.put("/employee/:id", auth, updateEmployee);

// ✅ พนักงานลบข้อมูลของตัวเอง
router.delete("/employee/:id", auth, deleteEmployee); // *** เพิ่ม Route สำหรับ Delete ***

module.exports = router;
