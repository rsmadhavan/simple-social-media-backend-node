const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre("save", async function (next) {
  try {
    await mongoose
      .model("User")
      .findByIdAndUpdate(
        this.author,
        { $push: { posts: this._id } },
        { new: true }
      );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
