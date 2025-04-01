const { default: mongoose } = require('mongoose');

require('dotenv').config();


const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connection success")
    }
    catch(error){
        console.log("mongodb connection error",error)
    }
}

module.exports=connectDB;
