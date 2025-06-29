const express = require("express");
const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "eror" });
    req.user = decoded;
    next();
  });
};
module.exports =verifyUser;