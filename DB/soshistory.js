const mongoose= require('mongoose');
// const jwt=require('jsonwebtoken');
// const bcrypt=require('bcrypt');

const SosHistory= new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Text is required'],

    },
    location: {
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

},{ collection: 'SosHistory' })





module.exports= mongoose.model('soshistory', SosHistory);