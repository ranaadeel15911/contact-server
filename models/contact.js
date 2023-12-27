const mongoose = require('mongoose')


const contactSchema = new mongoose.Schema({
    name:String,
    image:String,
    age:String,
    cloudinary_id:String,
},{timestamps:true})

module.exports = mongoose.model("contacts",contactSchema)