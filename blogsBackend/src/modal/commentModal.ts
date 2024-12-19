import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  postId: {
    type: String,

    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
