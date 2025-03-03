const path = require('path');
const fs = require('fs');

exports.validateUser = function(req,res,next){
    console.log(req.body.name)
    const isValidName = (name) => /^[A-Za-z]+$/.test(name.replace(' ',''));
    if(!isValidName(req.body.name)){
        res.render('error',{message:'Number is not a valid name'})
        return
    }
     fs.readFile(path.join(__dirname,'..','data','users.json'),(err,data)=>{
        if(err){
            res.render('error',{message:err})
            return
        }
        let employees= JSON.parse(data);
        for(let employee of employees){
            if(employee.name == req.body.name){
                res.render('error',{message:'User Already Exist'})
                return
            }
        }
        next()
     })
}