const express=require('express');
const Messages=require('../DB/messages');
const SosHistory = require('../DB/soshistory');
const route=express.Router();
const User=require('../DB/user');

route.post("/:id",async(req,res)=>{
    const userId = req.params.id;
    const {location}=req.body;
    const userLogin= await User.findOne({_id:userId});
    const text=userLogin.customText;

    var guardianArray = userLogin.guardians;
    // var messageArrayObj = [];
    // console.log(userLogin);

    if(guardianArray.length==0){
        return res.status(422).json({error:"No Guardians added"});
    }
    
    var historyObj = {
        text: text,
        location: location,
        time: new Date().toLocaleString(),
    }

    const history=SosHistory(historyObj);





    history.save().then((result)=>{
        //Update sos history array of the user in the mongodb database
        User.updateOne({_id:userId},{$push:{sosHistory:result._id.toString()}},(err,doc)=>{
            if(err){
                console.log(err);
            }
        });
    }).catch((err)=>res.status(500).json({error:"Failed to send SOS, Try again"}));




    for (var i = 0; i < guardianArray.length; i++) {
       var messageObj = {
            receiverId: guardianArray[i],
            senderId: userId,
            text: text,
            location: location,
            time: new Date().toLocaleString(),
       }      
       const messages=new Messages(messageObj);
       messages.save().then((result)=>{
       }).catch((err)=>res.status(500).json({error:"Failed to register, Try again"}));
   } 

    res.status(201).json("Message sent successfully");
    })




module.exports=route;