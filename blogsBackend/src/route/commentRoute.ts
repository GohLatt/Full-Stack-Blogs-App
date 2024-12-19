import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { creatComment } from "../controller/commentController";
const router = express.Router();

router.post("/comment", isAuth, creatComment);

export default router;
