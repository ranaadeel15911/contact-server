// const contact = require("../models/contact")
// const contact = require("../models/contact")
const contact = require("../models/contact")
const cloudinary = require('../utils/cloudinary')
const fs = require('fs')

const getAllContacts = async(req,resp)=>{
// resp.send('You have all contacts')
const contacts = await contact.find({}).exec()
console.log(contacts)
resp.status(200).json(contacts)
}

const addContacts = async(req,resp)=>{
// resp.send('You have all contacts')
try {
    console.log(req)
    const {path} = req.file
    console.log(path)
    const result = await cloudinary.uploader.upload(path) 
    console.log(result)
    const contacts = new contact({
        name:req.body.name,
        age:req.body.age,
        image:result.secure_url,
        cloudinary_id:result.public_id
    })
    await contacts.save()
    fs.unlinkSync(path)
    console.log(contacts)
    resp.status(200).json(contacts)
} catch (error) {
    console.log(error)
}
}
const editContacts = async(req,resp)=>{
// resp.send('You have all contacts')
try {
    let contacts = await contact.findById(req.params.id).exec()
    await cloudinary.uploader.destroy(contacts.cloudinary_id)
    result = null
    if(req.file){
        result = await cloudinary.uploader.upload(req.file.path)
        
    }
    const data = {
        name:req.body.name || contacts.name,
        age:req.body.age || contacts.age,
        image:result?.secure_url || contacts.image,
        cloudinary_id:result?.public_id || contacts.cloudinary_id
    }
    contacts = await contact.findByIdAndUpdate(req.params.id,data,{new:true})
    if (req.file) {
        fs.unlinkSync(req.file.path)
    }
    console.log(contacts)
    resp.status(200).json(contacts)
    }    
 catch (error) {
    resp.status(400).json({message:"Gone Wrong"})
}
}
const deleteContacts = async(req,resp)=>{
let contacts = await contact.findById(req.params.id).exec()
await cloudinary.uploader.destroy(contacts.cloudinary_id)
await contacts.remove()
resp.status(200).json(`Deleted Successfully ${contacts.name}`)
}
const getSingleContact = async(req,resp)=>{
    try {
        let contacts = await contact.findById(req.params.id).exec()
        // await cloudinary.uploader.destroy(contacts.cloudinary_id)
        console.log(contacts)
        resp.status(200).json(contacts)
    }    

     catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllContacts,
    addContacts,
    editContacts,
    deleteContacts,
    getSingleContact,
}