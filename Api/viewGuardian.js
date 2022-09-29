const express=require('express');

const User=require('../DB/user');
const route=express.Router();




    //login route
     route.post('/',async(req,res)=>{

        // res.send("Tarun Mali signin")

         let token;
        const {userId}=req.body;
        if (userId==="") {
           return res.status(422).json({error:"Try again"}); 
       }
    //    var userObj
       const userLogin= await User.findOne({_id:userId});


       //iterate over guardian array and covert it to array of objects
         var guardianArray = userLogin.guardians;
            var guardianArrayObj = [];
            for (var i = 0; i < guardianArray.length; i++) {
                var guardianObj = await User.findOne({_id:guardianArray[i]});
                guardianArrayObj.push(guardianObj);
            }
    //    userLogin.guardiansof.forEach((guardian)=>{
    //     // const guardianInfo=User.find({_id:guardian._id});
    //     userObj = guardian.toObject();
    //     // console.log(guardianInfo)
    //     // userObj = guardianInfo.toObject();
    //         //   console.log(guardian);
    //      })


         res.status(201).json(guardianArrayObj);
                // var userObj = userLogin.toObject();
                // delete userObj.password
                // delete userObj.confirmpassword
                // delete userObj.tokens
                // delete userObj.__v
                // delete userObj.guardians
                // delete userObj.guardiansof
                //   res.status(201);              
            
                


                // res.json(userLogin);




        
        
        



        
    })
     
    


module.exports=route;