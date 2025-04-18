// server.js
// ทำให้ run server ได้
const express = require("express"); // ประกาศตัวแปร express เพื่อมารับการทำงานจาก express
const { readdirSync } = require("fs"); // นำเข้า fs module เพื่อใช้ในการอ่านไฟล์ใน directory
const morgan = require("morgan"); // นำเข้า morgan middleware เพื่อใช้ในการ log request
const cors = require("cors"); // นำเข้า cors middleware เพื่อใช้ในการจัดการ CORS
const bodyParser = require("body-parser"); // นำเข้า body-parser middleware เพื่อใช้ในการ parse request body
const config = require("./config"); // นำเข้า config module เพื่อใช้ในการตั้งค่าต่างๆ
const { sequelize, testconnectDB } = require("./config/db.js"); // นำเข้า sequelize instance จาก config module
const dotenv = require("dotenv"); // นำเข้า dotenv module เพื่อใช้ในการโหลด env
const path = require("path"); // นำเข้า path เพื่อใช้จัดการ path ของไฟล์ต่าง ๆ

dotenv.config(); // โหลด dotenv เพื่อให้สามารถใช้ env ได้

const app = express(); // สร้างตัวแปร app เพื่อใช้ในการทำงานของ express
testconnectDB(); // เชื่อมต่อกับ database พร้อมแสดงข้อความว่าเชื่อมต่อสำเร็จ

// Auto-load models นำเข้าจาก models อัตโนมัติ
const basename = path.basename(__filename);
const modelsPath = path.join(__dirname, "models");
readdirSync(modelsPath)
  .filter((file) => file !== basename && file.endsWith(".js"))
  .forEach((file) => {
    require(path.join(modelsPath, file)); // auto-load models ทั้งหมดในโฟลเดอร์ models
  });

// Middleware
app.use(morgan("dev")); // ใช้ morgan middleware เพื่อ log request ในรูปแบบ dev
app.use(cors()); // ใช้ cors middleware เพื่อจัดการ CORS
app.use(bodyParser.json({ limit: "10mb" })); // ใช้ body-parser middleware เพื่อ parse request body เป็น json

// Route
// เชื่อมต่อ Routes สำหรับ Login
readdirSync("./Routes").map((file) =>
  app.use("/api", require(`./Routes/${file}`))
);

// รันเซิร์ฟเวอร์
sequelize.sync().then(() => {
  app.listen(5000, () => console.log("🚀 Server Running On Port 5000")); // ให้ server ทำงานที่ port 5000 และแสดงข้อความว่า server ทำงานอยู่
});
