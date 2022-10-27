// Junhua Guan
// ID: 301189162
// Date: 08 Oct 2022

const express = require("express")
const path = require("path")
const logger = require("morgan")
const expressLayouts = require('express-ejs-layouts')
const indexroutes = require("./app/routes/index")
// Routes for Business Contact and User

let usersroutes = require("./app/routes/user")
let businesscontactroutes = require("./app/routes/contact")


// modules for authentication
let session = require("express-session");
let passport = require("passport")
let passportLocal = require("passport-local")
let localStrategy = passportLocal.Strategy
let flash = require("connect-flash")

// database 
let mongoose = require('mongoose');
let DB = require('./app/config/db');

// moogoose to db url
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});


var app = express()
var HOST = "localhost"
var PORT = 3000


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './app/views'))
app.set('layout', 'partials/index')
 

app.use(expressLayouts);
app.use(express.static('public'));
app.use('css', express.static(__dirname + '..public/css'));

app.use('homepage', express.static(__dirname + './app/views/homepage'));
app.use('aboutMe', express.static(__dirname + './app/views/aboutMe'));
app.use('contactMe', express.static(__dirname + './app/views/contactMe'));
app.use('projects', express.static(__dirname + './app/views/projects'));


//Setup express-session
app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
}))

// flash
app.use(flash())

// passport
app.use(passport.initialize())
app.use(passport.session())


// create a user model instance
let userModel = require('./app/models/user')
let User = userModel.User

// user auth
passport.use(User.createStrategy())


// serialize and deserialize user info
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(('/'), indexroutes);
// routing for user and business 
app.use(('/users'), usersroutes)
app.use(('/contact-list'), businesscontactroutes)

//app.listen(PORT, (req, res) => {
//    console.log(`Server running at ${HOST}:${PORT}`)
//})

app.set("port", (process.env.PORT || 3000))

app.listen(app.get("port"), () => {
    console.log("Server is running at port3000")
})