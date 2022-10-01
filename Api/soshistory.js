const express=require('express');
const SosHistory = require('../DB/soshistory');
const User=require('../DB/user');
const route=express.Router();

route.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const userLogin= await User.findOne({_id:userId});

    var historyArray = userLogin.sosHistory;

    //iterate over guardian array and covert it to array of objects
         var historyArrayObj = [];
         for (var i = 0; i < historyArray.length; i++) {
             var historyResult = await SosHistory.findOne({_id:historyArray[i]});

            var historyObj = {

                text: historyResult.text,
                location: historyResult.location,
                time: historyResult.time,
            } 

             
             historyArrayObj.push(historyObj);
         }


      res.status(201).json(historyArrayObj);


  });


    //login route
    //  route.post('/',async(req,res)=>{


      

        
    // })
     
    


module.exports=route;