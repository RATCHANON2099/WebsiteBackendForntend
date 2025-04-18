// controllers/user.js
const { User } = require("../models/user");

exports.read = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const userID = req.params.id;
    const updated = await User.update(req.body, {
      where: {
        id: userID,
      },
    });
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const removed = await User.destroy({
      where: {
        id: id,
      },
    });
    res.json(removed);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.updateMyInfo = async (req, res) => {
  try {
    const { name, age, phone, id } = req.body;
    const userId = req.user.id; // ดึง id จาก token (auth middleware)

    // ค้นหาผู้ใช้โดยใช้ id ที่ได้จาก token
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send("User not found");

    // อัพเดตข้อมูล
    user.name = name || user.name; // หากไม่ได้รับค่า name ใหม่ ใช้ค่าเดิม
    user.age = age || user.age; // หากไม่ได้รับค่า age ใหม่ ใช้ค่าเดิม
    user.phone = phone || user.phone; // หากไม่ได้รับค่า phone ใหม่ ใช้ค่าเดิม
    user.id = id || user.id; // หากไม่ได้รับค่า id ใหม่ ใช้ค่าเดิม

    await user.save(); // บันทึกข้อมูลที่อัพเดต

    res.status(200).send("User info updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
