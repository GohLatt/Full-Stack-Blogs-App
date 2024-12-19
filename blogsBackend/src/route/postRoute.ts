import express from "express";

import { isAuth } from "../middlewares/isAuth";
import {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
  getPost,
} from "../controller/postController";
const router = express.Router();

router.post("/post", isAuth, createPost);
router.get("/post", isAuth, getAllPost);
router.get("/post_by_user", isAuth, getPost);
router.patch("/post", isAuth, updatePost);
router.delete("/post", isAuth, deletePost);

export default router;
