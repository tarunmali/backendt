const mongoose= require('mongoose');
// const jwt=require('jsonwebtoken');
// const bcrypt=require('bcrypt');

const MessageSchema= new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Text is required'],

    },
    location: {
        type: String,
    },

    receiverId : {              
        type: String,
    },

    senderId : {
        type: String,
    },
    
    time: {
        type: String,
    },
    


    tokens: [{
        token:{
        type: String,
        required: [true, 'Token is required'],
    }}]

},{ collection: 'Messages' })





module.exports= mongoose.model('messages', MessageSchema);