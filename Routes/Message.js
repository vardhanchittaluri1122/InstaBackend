const express=require("express");
const Route=express.Router();
const mongo=require("../Models/MessagesData");
const verify = require("../JWT/Verify");
Route.post("/",verify,async(req,res)=>{
    try{
    const {to,message}=req.body;
    const from=req.user.username;
    await mongo.create({from,to,message});
    res.sendStatus(200);
    }catch(error){
        console.log(error);
    }
    
});
Route.get("/:username",verify,async(req,res)=>{
    try{
     const current = req.user.username;
    const chatWith = req.params.username;
    const messages = await mongo.find({
    $or: [
      { from: current, to: chatWith },
      { from: chatWith, to: current }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
}catch(error){
    console.log("error");
}
})
module.exports=Route;