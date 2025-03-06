const User = require('../models/users');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/config');
const { route } = require('../routes/routes');
exports.handleHome=(req,res)=>{
    res.render('home')
}
exports.handleFormScreen=(req,res)=>{
    res.render('form',{message:'Create User',user:{
        name:'',
        profilePic:'',
        techStack:''
    },
    route :'/create'
})
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
exports.deleteUser = ( req,res)=>{
User.destroy({where:{id:req.params.id}}).then(()=>{
    res.redirect('/users')
}).catch((err)=>{
    res.send(err)
})
}
exports.editUser = (req,res)=>{
    User.findByPk(req.params.id).then((user)=>{
        res.render('form',{message:'Edit User',user:user,
        route:`/edit/${req.params.id}`
        })
    }).catch((err)=>{
        res.send(err)
    })
}
exports.updateUser = (req,res)=>{
    console.log(req.params.id)
 User.update({
    name:req.body.userName,
    profilePic:req.body.userProfile,
    techStack:req.body.userTechStack
 },{
    where:{
        id:req.params.id
    }
 }).then(()=>{
     res.redirect('/users')
 }).catch((err)=>{
        res.send(err)
    })
}
exports.handleProjects = (req,res)=>{
    res.render('submitprojects',{id:req.params.id})
}
exports.createProject = (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.params.id;
    User.findByPk(userId).then((user)=>{
        user.createProject({
            title:title,
            description:description
        }).then(()=>{
            res.redirect('/users')
        }).catch((err)=>{
            res.send(err)
        })
    })
}
exports.getProjects = (req,res)=>{
    User.findByPk(req.params.id,{include:'projects'}).then((user)=>{
        res.render('projects',{projects:user.projects})
    }).catch((err)=>{
        res.send(err)
    })
}
