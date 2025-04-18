// models/user_data.js

module.exports = (sequelize, DataTypes) => {
  const UserData = sequelize.define("user_data", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    phone: DataTypes.STRING,
    id: DataTypes.STRING,
  });

  return UserData;
};
