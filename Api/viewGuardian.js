const express=require('express');

const User=require('../DB/user');
const route=express.Router();

route.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const userLogin= await User.findOne({_id:userId});





    //iterate over guardian array and covert it to array of objects
      var guardianArray = userLogin.guardians;
         var guardianArrayObj = [];
         for (var i = 0; i < guardianArray.length; i++) {
             var guardianResult = await User.findOne({_id:guardianArray[i]});
             var guardianObj = guardianResult.toObject();

            var guardianObj = {
                _id: guardianResult._id.toString(),
                name: guardianResult.name,
                email: guardianResult.email,
                phone: guardianResult.phone,
            } 



            //  delete guardianObj.password
            //  delete guardianObj.confirmpassword
            //  delete guardianObj.tokens
            //  delete guardianObj.__v
            //  delete guardianObj.guardians
            //  delete guardianObj.guardiansof
            //  delete guardianObj.email
            // delete guardianObj.gender
            // delete guardianObj.age
            // delete guardianObj.address
             
             guardianArrayObj.push(guardianObj);
         }


      res.status(201).json(guardianArrayObj);


  });


    //login route
    //  route.post('/',async(req,res)=>{


      

        
    // })
     
    


module.exports=route;