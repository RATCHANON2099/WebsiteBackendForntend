// c:\project2\server\Middleware\auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../models/user"); // ตรวจสอบว่า import User ถูกต้อง

exports.auth = async (req, res, next) => {
  try {
    // 1. อ่าน Header 'Authorization'
    const authHeader = req.get("Authorization"); // หรือ req.headers.authorization

    // 2. ตรวจสอบว่า Header มีค่าและขึ้นต้นด้วย 'Bearer ' หรือไม่
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // ถ้าไม่มี หรือรูปแบบไม่ถูกต้อง ให้ส่ง 401
      // ใช้ 401 Unauthorized เพราะปัญหาเกี่ยวกับการยืนยันตัวตน
      return res.status(401).send("No Token or Invalid Authorization Format");
    }

    // 3. แยกเอาเฉพาะ Token (ส่วนที่อยู่หลัง 'Bearer ')
    // ใช้ authHeader ไม่ใช่ auth (ที่เป็น function) และไม่ใช่ token (ที่อาจจะอ่านมาจาก header ผิด)
    const tokenValue = authHeader.split(" ")[1];

    // 4. ตรวจสอบ token และดึงข้อมูลผู้ใช้
    // ใช้ tokenValue ที่แยกออกมาแล้ว และ secret key ที่ถูกต้อง ("jwtsecret")
    const decoded = jwt.verify(tokenValue, "jwtsecret");

    // 5. *** แก้ไขตรงนี้: เก็บ payload ทั้งหมดใน req.user ***
    req.user = decoded; // decoded คือ object payload { id, email, role }

    next(); // ไปยัง middleware หรือ controller ถัดไป
  } catch (err) {
    console.error("Authentication Error:", err.name, err.message); // แสดงชื่อ error ด้วย จะช่วย debug

    // จัดการ Error ประเภทต่างๆ ของ JWT ให้ละเอียดยิ่งขึ้น
    if (err.name === "JsonWebTokenError") {
      // Token ผิดรูปแบบ, secret ไม่ตรง, หรือปัญหาอื่นๆ ในการ verify
      return res.status(401).send("Invalid Token");
    }
    if (err.name === "TokenExpiredError") {
      // Token หมดอายุ
      return res.status(401).send("Token Expired");
    }

    // ถ้าเป็น error อื่นๆ ที่ไม่คาดคิด (เช่น TypeError จากการ split ผิดพลาดก่อนหน้านี้)
    // อาจจะยังคงส่ง 500 หรือ 401 ก็ได้ ขึ้นอยู่กับนโยบาย
    res.status(500).send("Server Error during authentication"); // หรือจะส่ง 401 ก็ได้
  }
};

// Middleware isAdmin (ตรวจสอบว่า req.user ถูกกำหนดค่าถูกต้อง)
exports.isAdmin = async (req, res, next) => {
  try {
    // ตรวจสอบก่อนว่า req.user มีค่าหรือไม่ (สำคัญมากหลังจากแก้ auth)
    if (!req.user || !req.user.id) {
      console.error(
        "isAdmin Middleware Error: req.user is not defined or missing id."
      );
      return res.status(401).send("Authentication required.");
    }

    // ใช้ req.user.id ที่ได้จาก token (หลังจากแก้ auth middleware แล้ว)
    const user = await User.findByPk(req.user.id);

    // ตรวจสอบว่าหา user เจอ และ role เป็น admin
    if (!user || user.role !== "admin") {
      // ใช้ 403 Forbidden เพราะยืนยันตัวตนได้แล้ว แต่ไม่มีสิทธิ์
      return res.status(403).send("Forbidden: Admin access required.");
    }

    next();
  } catch (err) {
    console.error("isAdmin Middleware Error:", err);
    res.status(500).send("Server Error");
  }
};
