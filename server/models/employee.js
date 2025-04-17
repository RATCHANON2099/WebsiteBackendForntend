const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Employee = sequelize.define("employee", {
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
});

module.exports = { Employee };
