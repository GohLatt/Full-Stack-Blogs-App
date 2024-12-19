import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    authorData: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
    },
    comments: [
      {
        name: { type: String },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
