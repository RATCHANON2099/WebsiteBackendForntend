const { User } = require("../models/user");

exports.read = async (req, res) => {
  try {
    // เขียนฟังก์ชั่นใส่ตรงนี้
    const users = await User.findOne({ where: { id: req.params.id } });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res) => {
  try {
    // code
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    // code
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    // code
    const userID = req.params.id;
    const updated = await User.update(req.body, {
      where: {
        id: userID,
      },
    });
    res.json(updated);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const removed = await User.destroy({
      where: {
        id: id,
      },
    });
    res.json(removed);
  } catch (err) {
    // error
    console.log(err);
    res.status(500).send("Server Error");
  }
};
