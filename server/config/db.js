//ไฟล์สำหรับเชื่อมต่อเข้ากับ database mariadb

const { Sequelize } = require("sequelize");
const config = require("../config");
const dotenv = require("dotenv");

dotenv.config(); //โหลด dotenv เพื่อให้สามารถใช้ env ได้

console.log("db", config); //แสดงค่าของ config

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
    host: config.db_host,
    port: config.db_port,
    dialect: "mariadb",
  }
);

async function testconnectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  sequelize,
  testconnectDB,
};
