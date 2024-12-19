import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./middlewares/rateLimitter";
import userRoute from "./route/userRoute";
import postRoute from "./route/postRoute";
import commentRoute from "./route/commentRoute";
export const app = express();

app
  .use(morgan("dev"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(helmet())
  .use(compression())
  .use(cors())
  .use(limiter);

//route

app.use("/api/v1", userRoute);
app.use("/api/v1", postRoute);
app.use("/api/v1", commentRoute);

//error handle
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Server Error";
  const errCode = err.code || "Error_Code";

  res.status(status).json({ message, errCode });
});
