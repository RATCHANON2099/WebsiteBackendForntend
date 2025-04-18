// Controllers/employee.js
const { Employee } = require("../models/employee"); // หรืออาจจะเป็น User ถ้าใช้ตารางเดียวกัน

// ฟังก์ชันดึงข้อมูลทั้งหมดของพนักงาน
exports.getEmployeesById = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { userId: req.user.id },
    });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// ฟังก์ชันเพิ่มพนักงาน
exports.addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// ฟังก์ชันลบพนักงาน
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id); // หา employee ด้วย id

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    await employee.destroy(); // ลบ employee
    res.status(200).send("Employee deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// ฟังก์ชันแก้ไขข้อมูลพนักงาน
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, id_card } = req.body;

    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    // อัปเดตข้อมูลพนักงาน
    employee.email = email || employee.email;
    employee.name = name || employee.name;
    employee.age = age || employee.age;
    employee.phone_number = phone || employee.phone_number;
    employee.id_number = id_card || employee.id_number;

    await employee.save(); // บันทึกการอัปเดต

    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
