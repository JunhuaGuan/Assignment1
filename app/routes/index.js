// Junhua Guan
// ID: 301189162
// Date: 08 Oct 2022

const express = require("express")
const router = express.Router()

let indexRoutesController = require('../controller/index')

router.get("/", indexRoutesController.homepage);
router.get("/homepage", indexRoutesController.homepage);
router.get("/aboutMe", indexRoutesController.aboutMe);
router.get("/contactMe", indexRoutesController.contactMe);
router.get("/projects", indexRoutesController.projects);
router.get("/services", indexRoutesController.services);

// displaying the Login page 
router.get('/login', indexRoutesController.displayLoginPage);

// processing the Login page 
router.post('/login', indexRoutesController.processLoginPage);

// displaying the Register page 
router.get('/register', indexRoutesController.displayRegisterPage);

// processing the Register page 
router.post('/register', indexRoutesController.processRegisterPage);

// perform UserLogout 
router.get('/logout', indexRoutesController.performLogout);

module.exports = router

