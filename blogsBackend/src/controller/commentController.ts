import { Request, Response, NextFunction } from "express";
import User from "../modal/usermodal";
import { CustomRequest } from "../middlewares/isAuth";
import { createError } from "../service/createError";
import Comment from "../modal/commentModal";
import Post from "../modal/postModal";

export const creatComment = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.comment && !req.body.postId)
      return next(createError("Invalid comment ", 400, ""));
    const user = await User.findById(req.userId);

    if (!user) return next(createError("User Not Fond", 400, ""));

    const comment = await Comment.create(req.body);

    await Post.findByIdAndUpdate(comment.postId, {
      $push: {
        comments: {
          name: user.name,
          comment: comment.comment,
        },
      },
    });
    res.status(201).json({ message: "success", data: { comment } });
  } catch (err) {
    next(err);
  }
};
