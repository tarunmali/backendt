const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

// const URL=process.env.DATABASE;

const URL='mongodb+srv://usernameakam:passwordakam@cluster0.xth6dmv.mongodb.net/one?retryWrites=true&w=majority'

const connectDB = async () => {
    await mongoose.connect(URL,{useUnifiedTopology: true,useNewUrlParser: true});
    console.log('MongoDB Connected...');
}

module.exports=connectDB;