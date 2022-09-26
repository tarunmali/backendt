const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const UserSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },

    phone : {
        type: Number,
        required: [true, 'Phone is required'],

    },




    age : {
        type: Number,
        required: [true, 'Age is required'],

    },

    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },



    password: {
        type: String,
        required: [true, 'Password is required'],

    },
    cpassword: {
        type: String,
        required: [true, 'Confirm Password is required'],

    },

    guardians:{
        type: Array,
    },

    guardiansof:{
        type: Array,
    },

    tokens: [{
        token:{
        type: String,
        required: [true, 'Token is required'],
    }}]

},{ collection: 'User' })



UserSchema.methods.generateAuthToken= async function(){
    try{
        let tokenTarun=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:tokenTarun});
        await this.save();
        return tokenTarun;
        //payload, secretKey, 

    }catch(err){
        console.log(err);
    }

    }








UserSchema.pre('save',async function(next){
    if(this.isModified('password')) {
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();

});


module.exports= mongoose.model('user', UserSchema);