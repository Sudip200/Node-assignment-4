const { DESCRIBE } = require('sequelize/lib/query-types');
const sequelize = require('../config/config');
const Sequelize = require('sequelize');

const Project = sequelize.define('project',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Project;