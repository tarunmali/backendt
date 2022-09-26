const express=require('express');

const User=require('../DB/user');
const route=express.Router();




    //login route
     route.post('/',async(req,res)=>{

        // res.send("Tarun Mali signin")

         let token;
        const {email}=req.body;
        if (email==="") {
           return res.status(422).json({error:"Please fill all the fields"}); 
       }

       const userLogin= await User.findOne({email:email});


        if(!userLogin){
            return res.status(422).json({error:"User does not exist"});
        }
        else{


                var userObj = userLogin.toObject();
                delete userObj.password
                delete userObj.cpassword
                delete userObj.tokens
                delete userObj.__v
                delete userObj.guardians
                delete userObj.guardiansof
    
                

                //already logedin ki id needed




                let idOfGuardian = userObj._id;
                let test="632f1932c4fb67a1f090e3c1"

//Updating the list of the guardians of the present user


                User.updateOne(
                    { _id: test },
                    { $push: { guardians: idOfGuardian } }
                ).then((result)=>{
                    
                    res.status(201).json(result);
                    // res.status(201).json(userObj);
                    
        
        
                }).catch((err)=>res.status(500).json({error:"Failed to register"}));

//Updating the list of "guardiansof"







                // res.json(userLogin);


        }



        
        
        



        
    })
     
    


module.exports=route;