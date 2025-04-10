const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //code

    //1.เช็คว่ามีข้อมูลแล้วหรือยัง
    const { name, email, password } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.send("User Already Exists").status(400);
    }
    //2.ถ้าไม่มีข้อมูลสมัครใหม่ Encrypt เข้ารหัส Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //3.Save
    user = await User.create({
      //สร้าง หรือ สมัคร user ใหม่ โดยรหัสจะเป็นรหัสของ user แบบที่เข้ารหัสแล้ว
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    //code
    //1.Check User
    const { email, password } = req.body;

    // หา user จากฐานข้อมูลตาม email
    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (user) {
      // เปรียบเทียบรหัสผ่านที่รับเข้ามากับรหัสผ่านใน DB
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }

      //2.Payload เตรียมข้อมูลเพื่อส่งไปหน้าบ้าน
      let payload = {
        user: {
          email: user.email,
        },
      };

      //3.Generate Token
      jwt.sign(payload, "jwtsecret", { expiresIn: 30 }, (err, token) => {
        //expiresIn: คือให้ Token หมดอายุภายในกี่วิ
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(404).send("User not found");
    }

    // res.send("Login Success");
  } catch (err) {
    //code
    console.log(err);
    res.status(500).send("Server Error");
  }
};
