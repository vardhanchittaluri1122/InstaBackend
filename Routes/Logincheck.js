const express = require("express");
const jwt=require("jsonwebtoken");
const Route = express.Router();
const mongo = require("../Models/usercollection");
const verify = require("../JWT/Verify");
Route.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginquery = await mongo.findOne({ username, password });
    if (!loginquery) {
      return res.status(401).json({ userlogincheck: false });
    }
  const token=jwt.sign({password:loginquery.password,username:loginquery.username},process.env.SECRET,{expiresIn:"1h"});
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None", // <- must be 'None' for cross-site cookies
  maxAge: 24 * 60 * 60 * 1000
});

     res.json({message:"ok.."});
  }catch (error) {
    console.log("❌ Login check error:", error);
    return res.status(500).json({ userlogincheck: false, error: "Server error" });
  }
});
Route.get("/",verify,(req,res)=>{
 res.json({ authenticated: true, user: req.user });
});
Route.post("/logout", (req, res) => {
res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});

  res.json({ message: "Logged out successfully" });
  console.log("ok");
});

module.exports = Route;
