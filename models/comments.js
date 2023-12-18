const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.pre("save", async function () {
  try {
    await mongoose
      .model("Post")
      .findByIdAndUpdate(
        this.post,
        { $push: { comments: this._id } },
        { new: true }
      );
  } catch (err) {
    console.log(err);
  }
});

// Create the comment model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
