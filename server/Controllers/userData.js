// Controllers/userData.js

const jwt = require("jsonwebtoken");
const { Employee } = require("../models"); // ใช้ model ที่ชื่อ employee

exports.createEmployeeData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ดึง email หรือ user id

    const { name, age, phone, id } = req.body;

    const employee = await Employee.create({
      email: decoded.email, // email จาก token
      name,
      age,
      phone,
      id_card: id, // mapping ชื่อ field ให้ตรงกับ DB
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error("Error saving employee data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
