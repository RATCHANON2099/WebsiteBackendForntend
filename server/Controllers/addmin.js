// Controllers/addmin.js
const { User } = require("../models/user");
const { Employee } = require("../models/employee"); // สมมติว่าใช้ Employee model

// 1. ดึงข้อมูลทั้งหมดจาก employee table
exports.getEmployeeData = async (req, res) => {
  try {
    const employees = await Employee.findAll(); // ดึงข้อมูล employee ทั้งหมด
    res.json(employees); // ส่งข้อมูล employee กลับไปที่ client
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// 2. เปลี่ยน role ของผู้ใช้ (เช่น จาก employee เป็น admin)
exports.changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body; // รับข้อมูลจาก body เช่น userId และ role ใหม่

    const user = await User.findByPk(userId); // ค้นหาผู้ใช้ใน user table โดยใช้ userId
    if (!user) {
      return res.status(404).send("User not found"); // ถ้าไม่พบผู้ใช้ ส่ง status 404
    }

    user.role = role; // เปลี่ยน role ของผู้ใช้
    await user.save(); // บันทึกการเปลี่ยนแปลง

    res.status(200).send("Role updated successfully"); // ส่งกลับการอัปเดต role สำเร็จ
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// 3. ลบข้อมูลจาก employee table
exports.deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params; // รับ employeeId จาก URL params

    const employee = await Employee.findByPk(employeeId); // ค้นหา employee ด้วย employeeId
    if (!employee) {
      return res.status(404).send("Employee not found"); // ถ้าไม่พบ employee ส่ง status 404
    }

    await employee.destroy(); // ลบ employee
    res.status(200).send("Employee deleted successfully"); // ส่งกลับการลบสำเร็จ
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// 4. แก้ไขข้อมูลของ employee
exports.updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params; // รับ employeeId จาก URL params
    const { name, email, phone, age } = req.body; // รับข้อมูลใหม่จาก body

    const employee = await Employee.findByPk(employeeId); // ค้นหา employee ด้วย employeeId
    if (!employee) {
      return res.status(404).send("Employee not found"); // ถ้าไม่พบ employee ส่ง status 404
    }

    // อัปเดตข้อมูลของ employee
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.age = age || employee.age;

    await employee.save(); // บันทึกการเปลี่ยนแปลงข้อมูล

    res.status(200).send("Employee updated successfully"); // ส่งกลับการอัปเดตสำเร็จ
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
