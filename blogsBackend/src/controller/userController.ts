import { Request, Response, NextFunction } from "express";
import User from "../modal/usermodal";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../service/createError";
import { CustomRequest } from "../middlewares/isAuth";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exitEmail = await User.findOne({ email: req.body.email });

    if (exitEmail) {
      return next(createError("Email already exist", 400, ""));
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({ message: "Account Created Success", user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email && !password)
      return next(createError("Invalid Email or Password", 400, ""));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(createError("Email not found", 400, ""));

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return next(createError("Password is incorrect", 400, ""));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT!, {
      expiresIn: process.env.EXP_TIME,
    });

    res.status(200).json({ message: "success", data: { user }, token });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.find();

  try {
    res
      .status(200)
      .json({ message: "success", data: { users }, result: users.length });
  } catch (err) {
    res.status(404).json({ message: "fail" });
  }
};

export const profile = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);

  res.status(200).json({ message: "success", data: { user } });
};
