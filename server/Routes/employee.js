const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth");
// const isAdmin = require("../Middleware/isAdmin");

const {
  addEmployee,
  getEmployeesById,
  updateEmployee,
} = require("../Controllers/employee");

// ✅ พนักงานดึงข้อมูลของตัวเอง
router.get("/employee/:id", auth, getEmployeesById);

// ✅ พนักงานเพิ่มข้อมูลของตัวเอง
router.post("/employee", addEmployee);

// ✅ พนักงานแก้ไขข้อมูลของตัวเอง
router.put("/employee/:id", auth, updateEmployee);

module.exports = router;
