const express = require('express')
const router = express.Router()

module.exports.homepage = (req, res, next) => {
    res.render("homepage", {
        title: "Homepage"
    });
};

module.exports.aboutMe = (req, res, next) => {
    res.render("aboutMe", {
        title: "AboutMe"
    });
};
module.exports.contactMe = (req, res, next) => {
    res.render("contactMe", {
        title: "ContactMe"
    });
};
module.exports.projects = (req, res, next) => {
    res.render("projects", {
        title: "Projects"
    });
};
module.exports.services = (req, res, next) => {
    res.render("services", {
        title: "Services"
    });
};

