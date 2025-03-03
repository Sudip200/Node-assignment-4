const User = require('../models/models');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/config');
exports.handleHome=(req,res)=>{
    res.render('home')
}
exports.handleFormScreen=(req,res)=>{
    res.render('form')
}
exports.handleCreate = ( req,res)=>{
    const name = req.body.userName;
    const profilePic = req.body.userProfile;
    const techStack = req.body.userTechStack;
    User.create({
        name:name,
        profilePic:profilePic,
        techStack:techStack
    }).then(()=>{
       res.redirect('/users')
    }).catch((err)=>{
        res.send(err)
    })
}
exports.handleUsers = (req,res)=>{
    User.findAll().then((users)=>{
        console.log(users)
        res.render('users',{users:users})
    }).catch((err)=>{
        res.send(err)
    })  
}