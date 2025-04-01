
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

exports.auth=async(req,res,next)=>{
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.jWT_secret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
exports.adminOnly=(req,res,next)=>{
  if(req.user.role!=='admin')
      return res.status(400).json({message:"access denied"})
  next()
}




