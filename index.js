const express = require('express')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const app = express()
const POR = process.env.PORT
//middleware
app.use(express.json())
// app.use(cors({
//     origin:["https://contact-frontend-one.vercel.app"],
//     methods:["POST","GET","DELETE","PUT"],
//     credentials:true
// }))
app.use(cors({ origin: "*", 
credentials: true }));
// app.use(cors())

const connectToDb = async()=>{
    try {
        const resp = await mongoose.connect("mongodb+srv://adeel:adeel193725@cluster0.uwmda7z.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        if(resp){
            console.log('mongodb Connected Successfully')
        }    
    } catch (error) {
        console.log(error)
    }
    
}
connectToDb()
//routes
app.use('/api/v1',require('./routes/contact'))
app.get("/",(req,resp)=>{
    resp.send("API is running ...")
    })
app.listen(POR,()=>{
    console.log(`Server Running on ${POR}`)
})