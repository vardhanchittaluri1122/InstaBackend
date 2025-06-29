const express=require("express");
const Route=express.Router();
const mongo=require("../Models/posts");
Route.get("/",async(req,res)=>{
    const data=await mongo.find();
    const username=data.map(user=>user.username);
    res.json({followerid:username});
});
module.exports=Route;
