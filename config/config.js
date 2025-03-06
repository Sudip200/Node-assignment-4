const Sequelize = require("sequelize");
const sequelize = new Sequelize("assignment", "postgres", "sudip", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
