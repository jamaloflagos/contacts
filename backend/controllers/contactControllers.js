

const Contact = require('../models/contactModels')
const mongoose = require('mongoose')

const objectId = mongoose.Types.ObjectId

// gettind data from db
const getContacts = async (req, res) => {
    // getting all the document in the database using the find method passing an empty object as an argument
    console.log('request recieved');

    const user_id = req.user._id
    
    const contact = await Contact.find({user_id}).sort({name: 1})
    res.json(contact)
}



// Adding to db

const postContact = async (req, res) => {
    const { name, phone_num, email} = req.body
    // add a document to the database using the create method and passing a object of the properties and its value
    // const {name, phone_num, email} = req.body

    try {
        const user_id = req.user._id
        const contact = await Contact.create({name, phone_num, email, user_id})
        res.json(contact)
        
    } catch(err) {
        res.json({error: "all field required"})
    } 
    console.log('post request recievd');
    
}

// getting one document

const getSingleContact = async (req, res) => {
    // getting a single document in the database using the findById method passing the id
    // check if the id is a valid one to handle error
    // check if the document exist 
    const { name } = req.params
    if(!name) {
        return res.status(400).json({error: "invalid NAME"})
    }

    const contact = await Contact.findById(name)
    if(!contact) {
        return res.status(400).json({error: "No such contact"})
    }
        res.json(contact)
    }
// delete a single document

const deleteContact = async (req, res) => {
    // deletinga single document in the database using the findByIdAndDelete method passing the id
    // check if the id is a valid one to handle error
    // check if the document exist
    const { id } = req.params
    if(!objectId.isValid(id)) {
        return res.status(400).json({error: "invalid ID"})
    }

    const contact = await Contact.findByIdAndDelete(id)
    if(!contact) {
        return res.status(400).json({error: "No such contact"})
    }
    console.log("delete request recieved");
    

    res.json(contact)

}

// update a document
const updateContact = (req, res) => {
    // updating a single document in the database using the findByIdAndUpdate method passing the id
    // check if the id is a valid one to handle error
    // check if the document exist
    const { id } = req.params
    if(!objectId.isValid(id)) {
        return res.status(400).json({error: "invalid ID"})
    }
    const contact = Contact.findByIdAndUpdate(id, {
        ...req.body
    })
    res.json({contact})

}

module.exports = {
    getContacts,
    postContact,
    deleteContact,
    updateContact,
    getSingleContact
}