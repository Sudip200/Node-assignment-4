const Sequelize = require("sequelize");
//connecting to sequelize using postgres database
const sequelize = new Sequelize("assignment", "postgres", "sudip", {
  dialect: "postgres",
  host: "localhost",
});
// to create connection create a database name assignment give your username password
// to use mysql change the dialect to mysql instead of postgres other code will be same exactly
module.exports = sequelize;
