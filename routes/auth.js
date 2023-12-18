const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const router = express.Router();

//Handles signin
router.post('/authenticate',async (req,res)=>{
  const {email,password} = req.body;
  if(!email) return res.status(400).json({message:'"email" is required'});
  if(!password) return res.status(400).json({message:'"password" is required'})

  //find user by email
  const user = await User.findOne({email});
  if(!user) return res.status(401).json({message:'Email or password is incorrect'});

  const validPassword = await bcrypt.compare(password,user.password);
  if(!validPassword) return res.status(401).json({message:'Email or password is incorrect'});

  //Generate JWT token with user ID as payload
  const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
  res.json({token});
})

module.exports = router;