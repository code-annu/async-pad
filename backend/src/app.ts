import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { authRouter } from "./api/router/auth-router";
import { errorHandler } from "./api/middleware/handle-error";

dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Success check message" });
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;
