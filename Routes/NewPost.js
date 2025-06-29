const express =require('express');
const multer=require('multer');
const {storage}=require('../Cloud')
const Route=express.Router();
const newpost=require("../Models/posts");
const upload=multer({storage});
Route.post("/", upload.single("media"), async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ postboolean: false, error: "No file uploaded" });
    }
    const mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";
    const postdatas = new newpost({
      mediaUrl: req.file.path,
      mediaType: mediaType,
      username:req.body.username
    });
    await postdatas.save();
    res.json({ postboolean: true,username:postdatas.username});
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ postboolean: false });
  }
});

Route.get("/", async (req, res) => {
  try {
    const postresult = await newpost.find();
    res.json({ postdata: postresult}); // just return the array
  } catch (error) {
    console.log(error);
    res.status(500).json({ postdata: [] }); // Optional: send empty on error
  }
});

module.exports=Route;
