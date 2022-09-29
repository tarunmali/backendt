const express=require('express');

const User=require('../DB/user');
const route=express.Router();




    //login route
     route.post('/',async(req,res)=>{

        // res.send("Tarun Mali signin")

         let token;
        const {phone,userId}=req.body;
        if (phone==="") {
           return res.status(422).json({error:"Please fill all the fields"}); 
       }

       const userLogin= await User.findOne({phone:phone});


        if(!userLogin){
            return res.status(422).json({error:"Guardian does not exist"});
        }
        else{
            //logic for guardian already exists


                var userObj = userLogin.toObject();
                    
//                 //already logedin ki id needed




//                 let idOfGuardian = userObj._id;
//                 // let test="6331288eeef1d9164ea90570"

// //Updating the list of the guardians of the present user


                User.updateOne(
                    { _id: userId },
                    { $push: { guardians: userObj._id } }
                ).then((result)=>{

                }).catch((err)=>res.status(500).json({error:"Failed to register"}));

//Updating the list of "guardiansof"

            User.updateOne(
                { _id: userObj._id },
                { $push: { guardiansof: userId } }
            ).then((result)=>{
                
                res.status(201).json(result);
                // res.status(201).json(userObj);
                


            }).catch((err)=>res.status(500).json({error:"Failed to register"}));






                // res.json(userLogin);


        }



        
        
        



        
    })
     
    


module.exports=route;