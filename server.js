const express= require('express')
const app = express()
const router = require('./routes/routes')
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/config')
const User = require('./models/users')
const Project = require('./models/projects')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

app.set('view engine','ejs')
app.set('views','views')
app.use(router)
app.use((req,res,next)=>{
    res.status(404).render('404')
})
User.hasMany(Project)
Project.belongsTo(User)

sequelize.sync().then(()=>{
    console.log('Database is connected')
}).catch(err=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})