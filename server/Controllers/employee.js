// Controllers/employee.js
const { Employee } = require("../models/employee"); // ตรวจสอบว่า import Model ถูกต้อง

// --- Controller ใหม่/แก้ไข สำหรับ GET /employee/:id ---
// ใช้หาข้อมูล Employee ด้วย ID ที่ระบุใน URL params
exports.getEmployeeById = async (req, res) => {
  // ตั้งชื่อใหม่ให้ชัดเจน (หรือใช้ชื่อเดิมแต่แก้ Logic)
  try {
    const employee = await Employee.findByPk(req.params.id); // *** หาด้วย Primary Key (id ที่ส่งมา) ***

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    // (แนะนำ) เพิ่มการตรวจสอบสิทธิ์ตรงนี้ ถ้าจำเป็น
    // if (employee.userId !== req.user.id && req.user.role !== 'admin') {
    //    return res.status(403).json({ message: "Forbidden" });
    // }
    res.json(employee); // *** คืนค่า Object เดียว ***
  } catch (err) {
    console.error("Error fetching employee by ID:", err);
    // จัดการ error กรณี ID format ผิด
    if (err.name === "SequelizeDatabaseError" || err.name === "CastError") {
      // ตัวอย่างสำหรับ Sequelize/Mongoose
      return res.status(400).json({ message: "Invalid Employee ID format." });
    }
    res.status(500).send("Server Error");
  }
};

//เอาไว้ใช้กับปุ่ม Edit คือหาข้อมูลเดียว ที่ userId ตรงกับ id ที่กด
exports.getDataEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ where: { userId: req.user.id } });
    if (!employee) {
      // คืน 404 ถ้าไม่เจอข้อมูล หรือคืน null ก็ได้
      return res
        .status(404)
        .json({ message: "Employee data not found for this user." });
      // return res.json(null);
    }
    res.json(employee); // คืนค่า Object เดียว
  } catch (err) {
    console.error("Error fetching employee data for current user:", err);
    res.status(500).send("Server Error");
  }
};

// --- แก้ไข Controller addEmployee ให้ผูก userId ---
exports.addEmployee = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Authentication required." });
    }
    const newEmployee = await Employee.create({
      ...req.body,
      userId: req.user.id, // *** ผูกกับ User ที่ Login ***
    });
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).send("Server Error");
  }
};

// --- แก้ไข Controller updateEmployee ให้รับ Field ถูกต้อง ---
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // *** รับค่าให้ตรงกับ Frontend ***
    const { name, email, age, phone_number, id_number } = req.body;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    // *** (แนะนำ) เพิ่มการตรวจสอบสิทธิ์ ***
    // if (employee.userId !== req.user.id) { return res.status(403).send("Forbidden"); }

    employee.email = email !== undefined ? email : employee.email; // อัปเดตถ้ามีค่าส่งมา
    employee.name = name !== undefined ? name : employee.name;
    employee.age = age !== undefined ? age : employee.age;
    employee.phone_number =
      phone_number !== undefined ? phone_number : employee.phone_number;
    employee.id_number =
      id_number !== undefined ? id_number : employee.id_number;
    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).send("Server Error");
  }
};

// --- Controller deleteEmployee (เพิ่มการเช็คสิทธิ์) ---
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    // *** (แนะนำ) เพิ่มการตรวจสอบสิทธิ์ ***
    // if (employee.userId !== req.user.id) { return res.status(403).send("Forbidden"); }
    await employee.destroy();
    res.status(200).send("Employee deleted successfully");
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).send("Server Error");
  }
};
