const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.statics.signUp = async function(email, password) {
   
    if(!email || !password) {
        throw Error("all input fields must be field")
    }
     
    if(!validator.isEmail(email)) {
        throw Error("not a valid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("not a valid password")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw  Error("the email have already been used")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error("all inputs must be filled")
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw error("incorrect passowrd")
    }

    return user
}

module.exports = mongoose.model('user', userSchema)