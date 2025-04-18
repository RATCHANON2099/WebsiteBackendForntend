// Controllers/auth.js
// ใช้เข้ารหัส
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // เข้ารหัส Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
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
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Password Invalid!!!");
    }

    // ✅ แก้: เอา ":" ออกจาก "jwtsecret:"
    jwt.sign(
      {
        //สิ่งที่ส่งเข้า token
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "jwtsecret",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        // ✅ แก้: ส่ง user ที่มี id, name, email กลับให้ frontend ใช้
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
