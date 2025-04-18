// Routes/user.js
const express = require("express");
const router = express.Router();
const {
  read,
  list,
  create,
  update,
  remove,
  updateMyInfo,
} = require("../Controllers/user");
const { auth } = require("../Middleware/auth"); // ใช้ middleware auth ที่จะเช็ค token

// Routes สำหรับการอ่านข้อมูลของผู้ใช้
router.get("/:id", auth, read); // ต้องล็อกอินก่อนถึงจะดูข้อมูลได้

// Routes สำหรับดึงข้อมูลผู้ใช้ทั้งหมด (ต้องเป็น admin)
router.get("/", auth, list);

// Routes สำหรับสร้างผู้ใช้ใหม่
router.post("/", create); // สามารถเข้าถึงได้จากทุกคน

// Routes สำหรับการอัพเดตข้อมูลผู้ใช้ (ผู้ใช้ที่ล็อกอิน)
router.put("/:id", auth, update); // ต้องล็อกอินก่อนถึงจะอัพเดตได้

// Routes สำหรับการลบผู้ใช้ (ต้องเป็น admin)
router.delete("/:id", auth, remove);

// Routes สำหรับอัพเดตข้อมูลผู้ใช้ (เฉพาะตัวเองที่ล็อกอิน)
router.patch("/updateMe", auth, updateMyInfo);

module.exports = router;
