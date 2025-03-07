const sequelize = require("../config/config");
const Sequelize = require("sequelize");
// user schema with id,firstname,lastname,profilePic,techStack,profilePic,techStack
const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilePic: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  techStack: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
