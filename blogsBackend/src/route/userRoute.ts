import express from "express";
import {
  getAllUsers,
  logIn,
  profile,
  register,
} from "../controller/userController";
import { isAuth } from "../middlewares/isAuth";
const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);

router.get("/users", isAuth, getAllUsers);
router.get("/profile", isAuth, profile);

export default router;
