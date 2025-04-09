const { DataTypes } = require("sequelize"); //นำเข้า DataTypes จาก sequelize
const { sequelize } = require("../config/db"); //นำเข้า sequelize จาก config/db.js

const User = sequelize.define(
  //defrne คำสั่งสร้าง table ใน database
  "users",
  {
    //ตั้งชื่อ table ว่า user โดยแทนไว้ใน User
    name: {
      //กำหนด column name
      type: DataTypes.STRING, //กำหนด type ของ column name เป็น string
      allowNull: true, //กำหนดว่า column name สามารถเป็น null ได้
    },
    age: {
      type: DataTypes.INTEGER, //กำหนด type ของ column age เป็น integer
      allowNull: true, //กำหนดว่า column age สามารถเป็น null ได้
    },
    email: {
      type: DataTypes.STRING, //กำหนด type ของ column email เป็น string
      allowNull: false, //กำหนดว่า column email สามารถเป็น null ได้
    },
    password: {
      type: DataTypes.STRING, //กำหนด type ของ column password เป็น string
      allowNull: false, //กำหนดว่า column password สามารถเป็น null ได้
    },
    id_number: {
      type: DataTypes.STRING, //กำหนด type ของ column id_number เป็น string
      allowNull: true, //กำหนดว่า column id_number สามารถเป็น null ได้
    },
    phone_number: {
      type: DataTypes.STRING, //กำหนด type ของ column phone_number เป็น string
      allowNull: true, //กำหนดว่า column phone_number สามารถเป็น null ได้
    },
    role: {
      type: DataTypes.STRING, //กำหนด type ของ column role เป็น string
      allowNull: true, //กำหนดว่า column role สามารถเป็น null ได้
    },
  },
  {}
);

module.exports = { User };
