import { Request, Response, NextFunction } from "express";
import Post from "../modal/postModal";
import { CustomRequest } from "../middlewares/isAuth";
import { createError } from "../service/createError";
import User from "../modal/usermodal";

export const createPost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return next(createError("User Not Fond", 400, ""));

    const post = await Post.create({
      ...req.body,
      authorData: { id: req.userId, name: user.name },
    });

    if (!post) return next(createError("Post create Fail", 400, ""));

    await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          posts: {
            id: post._id,
            title: post.title,
            content: post.content,
          },
        },
      },
      { new: true }
    );

    res.status(201).json({ message: "Post created success", data: { post } });
  } catch (err) {
    next(err);
  }
};

export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();

    if (!posts) return next(createError("Post can't find", 404, ""));

    res
      .status(200)
      .json({ message: "success", data: { posts }, restult: posts.length });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);

  if (!user)
    return next(createError("You can't action", 400, "Attacker_Error"));

  try {
    const post = await Post.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "update success", post: post });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);

  if (!user)
    return next(createError("You can't action", 400, "Attacker_Error"));

  try {
    const post = await Post.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: "update success", post: post });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const posts = await Post.find();
  console.log(posts);
  const userPost = posts.filter(
    (d) => d.authorData?.id?.toString() === req.userId
  );

  if (!userPost)
    return next(createError("User Not Found", 400, "Attacker_Error"));

  console.log(userPost);
  res.status(200).json({ posts: userPost });
};
