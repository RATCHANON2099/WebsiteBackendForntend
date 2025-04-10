const express = require("express");
const router = express.Router(); //สร้างตัวแปร router เพื่อใช้ในการทำงานของ express.Router()
const { read, list, create, update, remove } = require("../Controllers/user"); //นำเข้า controller product เพื่อใช้ในการจัดการ request
//middleware
const { auth } = require("../Middleware/auth");

//http://localhost:5000/api/product
router.get("/user", auth, list); //ใช้ router.get() เพื่อสร้าง route ใหม่ โดยใช้ method GET และ path /user
router.get("/user/:id", auth, read); //ใช้ router.get() เพื่อสร้าง route ใหม่ โดยใช้ method GET และ path /user/:id
router.post("/user", auth, create); //ใช้ router.post() เพื่อสร้าง route ใหม่ โดยใช้ method POST และ path /user
router.put("/user/:id", auth, update); //ใช้ router.put() เพื่อสร้าง route ใหม่ โดยใช้ method PUT และ path /user/:id
router.delete("/user/:id", auth, remove); //ใช้ router.delete() เพื่อสร้าง route ใหม่ โดยใช้ method DELETE และ path /user/:id

module.exports = router; //ส่ง router ออกไปใช้งานในไฟล์อื่นๆ
