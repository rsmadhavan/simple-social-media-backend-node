const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = async function(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).json({message:'Unauthorized'});
  }
  const token = req.headers.authorization.split(' ')[1];
   
  //check token exists
  if(!token){
    return res.status(401).json({message:'Unauthorized'});
  }

  try{
    //verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    //add decoded user to request object
    const user = await User.findById(decoded.userId);
    if(!user) return res.status(400).json({message:'User does not exist'});
    req.user=user;
    next();
  }catch(err){
    res.status(401).json({message:'Invalid token'});
  }

};