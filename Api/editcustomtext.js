const {validateToken}=require("../middlewares/AuthMiddleware")

const express=require('express');

const User=require('../DB/user');
const route=express.Router();


    route.put("/:id" ,async (req, res) => {
    // route.put("/:id",validateToken ,async (req, res) => {
        const userId = req.params.id;

        User.updateOne(
            { _id: userId },
            { $set: { customText: req.body.customText } }
        ).then((result)=>{
            res.json("Edited successfully");

        }).catch((err)=>res.status(500).json({error:"Failed to edit"}));
  })

  module.exports = route;