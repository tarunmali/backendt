const express=require('express');
const User=require('../DB/user');
const route=express.Router();
const bcrypt=require('bcrypt');

     route.post('/',async(req,res)=>{
        const {phone, password}=req.body;


        if (phone==="" || password==="") {
           return res.status(422).json({error:"Please fill all the fields"}); 
       }

       const userLogin= await User.findOne({phone:phone});


        if(!userLogin){
            return res.status(422).json({error:"User does not exist"});
        }
        else{
            const isMatch=await bcrypt.compare(password,userLogin.password);
            if(!isMatch){
                return res.status(422).json({error:"Password is incorrect"});
            }
            else{
                var userObj = {
                    _id: userLogin._id.toString(),
                    name: userLogin.name,
                    email: userLogin.email,
                    phone: userLogin.phone,
                    customText: userLogin.customText
                } 
                res.status(201).json(userObj);
            }

        }



        
        
        



        
    })
     
    


module.exports=route;