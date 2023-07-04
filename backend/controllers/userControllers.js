const User = require("../models/userModels")
const jwt = require("jsonwebtoken")

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "2days"})
}

const signUp = async (req,res) => {
    const {email, password} = req.body 
    try {
        const user = await User.signUp(email, password)

        const token = await generateToken(user._id)
        res.json({email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

    console.log('recieved');

    
}

const login = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = await generateToken(user._id)

        res.status(200).json({email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {signUp, login}