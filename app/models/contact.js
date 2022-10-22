let mongoose = require("mongoose")

let businessmodel = mongoose.Schema({
    name: String,
    phone: String,
    email: String
},
{
    collection: "businesses"
})

module.exports = mongoose.model("business contact list", businessmodel)