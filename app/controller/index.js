// Junhua Guan
// ID: 301189162
// Date: 08 Oct 2022

const express = require('express')
const router = express.Router()
let mongoose = require('mongoose');
let passport = require('passport');
let jwt = require('jsonwebtoken');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

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


module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
       res.render('login',
       {
         title: "Login",
         massages: req.flash('loginMessage'),
         displayName: req.user ? req.user.displayName : ''
       })

    }
    else
    {
       return res.redirect('/')
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if(err)
        {
            return next(err)
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error')
            return res.redirect('/login')
        }
        req.login(user, (err) =>{
            if(err)
            {
                return next(err)
            }
            return res.redirect('/contact-list')
        })
    })(req,res,next)
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}

module.exports.processRegisterPage = (req, res, next) => {
        let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            })
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            })
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}