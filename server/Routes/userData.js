// Routes/userData.js
const express = require("express");
const router = express.Router();
const { auth } = require("../Middleware/auth"); // นำเข้า auth ที่มีอยู่แล้ว

router.get("/admin", auth, (req, res) => {
  res.send("Admin data");
});

module.exports = router;
