const express = require('express');
const router = express.Router();
const User = require('../models/users');
const auth = require('../middleware/auth')

//Get user details after auth
router.get('/user',auth,async (req,res)=>{
  try{
    const userId = req.user.id;
    const user = await User.findById(userId);
    const userName = user.name;
    const userEmail = user.email;
    const noOfPosts = user.posts;
    res.json(
      {
        name:userName,
        email:userEmail,
        post:noOfPosts
      });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  } 
});

//Create new user
router.post('/register',async (req,res)=>{
  const {name,email,password} = req.body;

  const user = new User({name,email,password});
  await user.save();

  res.json(user);
});

//Edit user details
router.put('/user/edit',auth,async(req,res)=>{
  try{
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.name = req.body.name??user.name;
    user.email= req.body.email??user.email;
    user.password = req.body.password??user.password;
    user.save();
    res.json({message:'Changed profile details'})
  }catch(err){

  }
})

//Delete a profile
router.delete('/user/:id',auth,async(req,res)=>{
  try{
    const userId = req.user.Id
    const user = await User.findById(userId);

    //delete user
    await user.deleteOne({_id:req.params.id});
    res.status(204).json({message:"user deleted"})
  }catch(err){
    console.error(err);
    res.status(500).send('server Error');
  }
});

module.exports = router;