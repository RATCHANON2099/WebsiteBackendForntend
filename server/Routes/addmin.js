// Routes/addmin.js
const express = require("express");
const router = express.Router();
const {
  getEmployeeData,
  changeUserRole,
  deleteEmployee,
  updateEmployee,
} = require("../Controllers/addmin");
const { auth } = require("../Middleware/auth");

// middleware ตรวจสอบว่าเป็น admin หรือไม่
router.get("/employee", auth, getEmployeeData); // admin สามารถดึงข้อมูล employee ได้
router.put("/user/role", auth, changeUserRole); // admin สามารถอัปเดต role ของ user ได้

// เพิ่ม route สำหรับการลบและแก้ไข employee
router.delete("/employee/:employeeId", auth, deleteEmployee); // admin สามารถลบข้อมูล employee ได้
router.put("/employee/:employeeId", auth, updateEmployee); // admin สามารถแก้ไขข้อมูล employee ได้

module.exports = router;
