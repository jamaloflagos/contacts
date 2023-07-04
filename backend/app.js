require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose')

const app = express(); 
const contactRouter = require('./routers/contactRouters')
const userRouter = require('./routers/userRouters')

try {
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => console.log(`connected to databse and listening on port ${process.env.PORT}`))
})
} catch(err) {
    console.log(err)
}



app.set('view engine', 'ejs')


// middlewears
app.use(express.json())


app.use("/api/contact",contactRouter)
app.use("/api/user", userRouter)
