const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../models/posts");


// Create a post using POST
router.post(
  "/posts",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: "Invalid inputs" });

    try {
      //Create post
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id,
      });
      //Save the post to db
      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//DELETE post by id
router.delete('/posts/:id',auth,async (req,res)=>{
  try{
    // const postId = req.params.id;
    // const 
    //find post by ID and verify created by user
    const post = await Post.findOne({_id:req.params.id,author:req.user.id});
    if(!post) return res.status(404).json({message:'post not found'});


    //Delete post and its associated comments
    await Post.deleteOne({_id:req.params.id});
    res.status(202).json({message:"Post deleted"});
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;