// Junhua Guan
// ID: 301189162
// Date: 08 Oct 2022

const express = require("express")
const path = require("path")
const logger = require("morgan")
const expressLayouts = require('express-ejs-layouts')
const indexroutes = require("./app/routes/index")

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

app.use(('/'), indexroutes);

app.listen(PORT, (req, res) => {
    console.log(`Server running at ${HOST}:${PORT}`)
})

