// index.js
// npm install express
// npm install ejs
// npm install cookie-parser
// npm install nodemon 
// npm install express-fileupload
// npm install dotenv

const express = require('express')
const app = express()
const path = require("path")
const cookieParser = require('cookie-parser')
const upload = require("express-fileupload")
const dotenv = require('dotenv')
dotenv.config()

process.env.TZ = "Asia/Phnom_Penh"
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))
app.use(upload())

const { setup, db } = require("./config")

app.use(async (req, res, next) => {
    req.mydb = db
    req.mysetup = setup
    req.myupload = path.join(__dirname, 'public/upload/')
    next()
})

const frontendRouter = require('./routes/frontend.js')
const backendRouter = require('./routes/backend.js')

app.use('/', frontendRouter) 
app.use('/admin', backendRouter) 

app.listen(3000, 'localhost', function(){
    console.log(`This application is listening to the port: 3000`)
})

module.exports = app