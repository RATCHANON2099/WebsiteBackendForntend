//Middleware ทำเพื่อความปลอดภัย จะเช็คว่า Token ถูกไหม ถ้าไม่มีหรือไม่ถูกจะไม่สามารถทำอะไรได้ ทำเพื่อความปลอดภัย
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    //code
    const token = req.get("authtoken");
    if (!token) {
      return res.status(401).send("No Token");
    }
    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded.user;

    next();
  } catch (err) {
    //code
    console.log(err);
    res.status(500).send("Token Invalid");
  }
};
