import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { createError } from "../service/createError";

export interface CustomRequest extends Request {
  userId?: string;
}

export const isAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return next(createError("You are not authorize", 401, ""));

  // const decoded = jwt.verify(token, process.env.JWT_SECRECT!);

  // console.log(decoded);

  jwt.verify(token, process.env.JWT_SECRECT!, function (err, decoded) {
    if (err instanceof TokenExpiredError) {
      return next(createError("Token expired,Log out", 401, "Token_Expired"));
    } else if (err instanceof JsonWebTokenError) {
      return next(createError("Invalid token,Log out", 403, "Attack_Code"));
    } else {
      if (typeof decoded === "object" && "id" in decoded) {
        req.userId = decoded.id as string; // Cast to string if necessary
      }
    }
  });

  next();
};
