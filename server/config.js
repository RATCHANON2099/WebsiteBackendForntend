//ไฟล์สำหรับเป็นคำสั่งเชื่อมต่อไปยังฐานข้อมูล MariaDB และไปเอารหัสเชื่อต่อจาก .env

require("dotenv").config(); //โหลด dotenv เพื่อให้สามารถใช้ env ได้

const config = {
  //ไฟล์สำหรับเก็บค่าคอนฟิกต่างๆ
  db_pass: process.env.mariaDB_PASSWORD,
  db_user: process.env.mariaDB_USER,
  db_name: process.env.mariaDB_DB,
  db_port: process.env.mariaDB_PORT,
  db_host: process.env.mariaDB_HOST,
};

module.exports = config; //ส่งค่า config ออกไปให้ไฟล์อื่นๆที่ต้องการใช้
