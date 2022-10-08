const express = require("express")
const router = express.Router()

let indexRoutesController = require('../controller/index')

router.get("/", indexRoutesController.homepage);
router.get("/homepage", indexRoutesController.homepage);
router.get("/aboutMe", indexRoutesController.aboutMe);
router.get("/contactMe", indexRoutesController.contactMe);
router.get("/projects", indexRoutesController.projects);
router.get("/services", indexRoutesController.services);


module.exports = router

