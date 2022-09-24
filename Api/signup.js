const express=require('express');
const User=require('../DB/user');
const route=express.Router();



// This is important 
route.post('/',async(req,res)=>{

    // res.send("Tarun Mali signup")
    // console.log(req.body)
    const {name, email, phone, work, password, cpassword}=req.body;
    // // console.log(name);
    if (name==="" || email===""  || work==="" || password==="" || cpassword==="" || phone==="") {
       return res.status(422).json({error:"Please fill all the fields"}); 
    }

    const userLogin= await User.findOne({email:email});

    if(userLogin){
        return res.status(422).json({error:"User already exist"});
    }

    else if(password!=cpassword){
        return res.status(422).json({error:"Password doesn't match"});
    }

    else{
        const user=User(req.body);
        await user.save()
        res.status(200).json({ message: "user registered successfuly" });
    }
    })


    // console.log(user);
    
    // // res.json(user)
    // console.log(user)



module.exports=route;