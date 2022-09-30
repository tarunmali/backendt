const express=require('express');

const User=require('../DB/user');
const route=express.Router();




    //login route
     route.post('/',async(req,res)=>{

        // res.send("Tarun Mali signin")

        const {phone,userId}=req.body;
        if (phone==="") {
           return res.status(422).json({error:"Please fill all the fields"}); 
       }

       
       const guardianLogin= await User.findOne({phone:phone});
       //guardianLogin contains the details of the guardian we want to add


        if(!guardianLogin){
            return res.status(422).json({error:"Guardian does not exist"});
        }
        else{
            const userLogin= await User.findOne({_id:userId}); 
            //finding guardian array of the loggen in user
    
            guardianArray=userLogin.guardians;

            for (var i = 0; i < guardianArray.length; i++) 
                // console.log(guardianArray[i])
                // console.log(guardianLogin._id.toString())
                // console.log(userId)
                if(guardianArray[i]===guardianLogin._id.toString()){
                {
                    return res.status(422).json({error:"Guardian already exist"});
                }
                }
            
                User.updateOne(
                    { _id: userId },
                    { $push: { guardians: guardianLogin._id.toString() } }
                ).then((result)=>{

                }).catch((err)=>res.status(500).json({error:"Failed to register"}));

//Updating the list of "guardiansof"

            User.updateOne(
                { _id: guardianLogin._id.toString()},
                { $push: { guardiansof: userId } }
            ).then((result)=>{
                
                res.status(201).json(result);
                // res.status(201).json(userObj);
                


            }).catch((err)=>res.status(500).json({error:"Failed to register"}));






                // res.json(userLogin);


    }



        
        
        



        
    })
     
    


module.exports=route;