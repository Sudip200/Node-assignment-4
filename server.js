const express= require('express')
const app = express()
const router = require('./routes/routes')
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/config')
const User = require('./models/models')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views','views')
app.use(router)

sequelize.sync().then(()=>{
    console.log('Database is connected')
}).catch(err=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log('listening on port 3000')
})