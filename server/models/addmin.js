// models/addmin.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Admin = sequelize.define("admin", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER, // foreign key from `users`
    allowNull: false,
  },
});

module.exports = { Admin };
