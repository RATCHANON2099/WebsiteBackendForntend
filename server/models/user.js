const { DataTypes } = require("sequelize"); //นำเข้า DataTypes จาก sequelize
const { sequelize } = require("../config/db"); //นำเข้า sequelize จาก config/db.js

const User = sequelize.define(
  //defrne คำสั่งสร้าง table ใน database
  "users",
  {
    //ตั้งชื่อ table ว่า user โดยแทนไว้ใน User เพื่อเอาไปเรียกใช้
    email: {
      type: DataTypes.STRING, //กำหนด type ของ column email เป็น string
      allowNull: false, //กำหนดว่า column email ไม่สามารถเป็น null ได้
    },
    password: {
      type: DataTypes.STRING, //กำหนด type ของ column password เป็น string
      allowNull: false, //กำหนดว่า column password ไม่สามารถเป็น null ได้
    },
    role: {
      type: DataTypes.STRING, //กำหนด type ของ column role เป็น string
      allowNull: false, //กำหนดว่า column role ไม่สามารถเป็น null ได้
      defaultValue: "employee", //กำหนด role เป็น employee เป็นค่าเริ่มต้นเมื่อสมัครเสร็จ
    },
  },
  {}
);

module.exports = { User };
