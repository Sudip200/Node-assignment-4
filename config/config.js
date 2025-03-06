const Sequelize = require('sequelize');
const sequelize = new Sequelize('assignment', 'root',"",{
    dialect: 'mysql',
    host: 'localhost',
});


module.exports = sequelize;