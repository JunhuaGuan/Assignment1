let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let jwt = require('jsonwebtoken')
let Contact = require('../models/contact')

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('contact/list', 
            {title: 'Contacts', 
            ContactList: contactList, 
            displayName: req.user ? req.user.displayName : ''});     
        }
    })
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', {title: 'Add Into Contact', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    })

    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    })
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit', {title: 'Edit', conatact: contactToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    let update = Contact({
        "_id": id,
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone
    })

    Contact.updateOne({_id: id}, update, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.redirect('/contact-list');
        }
    })
}