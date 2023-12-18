const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../models/posts");
const Comment = require("../models/comments");

// Create comment using POST
router.post(
  "/comment",
  [auth, [check("comment_text", "text is required").not().isEmpty()]],
  async (req, res) => {
    try {
      //check errors
      console.log(post_id,comment_text);
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ messsage: "Invalid inputs" });

      const post = await Post.findById(post_id);
      if (!post) return res.status(404).json({ message: "post not found" });
      const comment = new Comment({
        author: req.user.id,
        post: post_id,
        text: comment_text,
      });

      await comment.save();
      res.status(201).json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Servor Error");
    }
  }
);

//Delete comment
router.delete('/comment/:id',auth,async (req,res)=>{
  try{
    // const postId = req.params.id;
    // const 
    //find post by ID and verify created by user
    const comment = await Comment.findOne({_id:req.params.id,author:req.user.id});
    if(!comment) return res.status(404).json({message:'Comment not found'});


    //Delete comments
    await Comment.deleteOne({_id:req.params.id});
    res.status(204).json({message:"Comment deleted"});
  }catch(err){
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;
