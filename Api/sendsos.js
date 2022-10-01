const express=require('express');
const Messages=require('../DB/messages');
const route=express.Router();
const User=require('../DB/user');

route.post("/:id",async(req,res)=>{
    const userId = req.params.id;
    const {location}=req.body;
    const userLogin= await User.findOne({_id:userId});
    const text=userLogin.customText;

    var guardianArray = userLogin.guardians;
    // var messageArrayObj = [];
    console.log(userLogin);


    for (var i = 0; i < guardianArray.length; i++) {
       var messageObj = {
            receiverId: guardianArray[i],
            senderId: userId,
            text: text,
            location: location,
            time: new Date().toLocaleString(),
       } 
        //  const message=new Messages(messageObj);
         
       const messages=new Messages(messageObj);

       messages.save().then((result)=>{
       }).catch((err)=>res.status(500).json({error:"Failed to register, Try again"}));
   }      
    res.status(201).json("Message sent successfully");
    })




module.exports=route;