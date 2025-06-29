const multer=require('multer');
const express = require('express');
const {storage}=require('../Cloud')
const Route = express.Router();
const User = require('../Models/usercollection');
const verify=require('../JWT/Verify');
const upload=multer({storage});
Route.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ boolean: true });
    console.log("ok inserted");
  } catch (error) {
    console.error(" Error saving user:", error);
    res.json({ boolean: false });
  }
})
Route.get("/followers/details", verify, async (req, res) => {
  try {
    const username = req.user.username;
    const details = await User.findOne({ username });

    if (!details) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = details.toObject();
    userData.followersCount = details.followers.length ;
    userData.followingCount = details.following.length ;
    userData.postingCount = details.posts.length;
    res.json(userData);
  } catch (err) {
    console.error("  errooor:", err);
    res.status(500).json({ error: "Server error" });
  }
})
Route.post("/followers/details", upload.single("profile"), verify, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const cloudinaryUrl = req.file.path;
    user.profilepic = cloudinaryUrl;
    await user.save();
    const updated = user.toObject();
    updated.followersCount = user.followers?.length || 0;
    updated.followingCount = user.following?.length || 0;
    updated.postingCount = user.posts?.length || 0;

    res.json(updated);
  } catch (err) {
    console.error("Error uploading profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = Route;
