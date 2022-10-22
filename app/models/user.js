let mongoose = require("mongoose")
let passportLocalMongoose = require("passport-local-mongoose")
const { update } = require("./contact")

let User = mongoose.Schema
(
    {
        username:
        {
            type: String, default: "", trim: true, require: "username is require"
        },

        password:
        {
            type: String, default: "", trim: true, require: "password is require"
        },

        email:
        {
            type: String, default: "", trim: true, require: "email is require"
        },

        displayName:
        {
            type: String, default: "", trim: true, require: "Display name is require"
        },

        created:
        {
            type: Date,
            default: Date.now
        },

        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
)

let options = ({ missingPasswordError: "Wrong / Missing Password" })


User.plugin(passportLocalMongoose, options)

module.exports.User = mongoose.model("User", User)