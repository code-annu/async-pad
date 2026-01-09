import "reflect-metadata";
import express, { Request, Response } from "express";
import { authRouter } from "./api/router/auth-router";
import { profileRouter } from "./api/router/profile-router";
import { asyncPadDocumentRouter } from "./api/router/asyncpad-document-router";
import { collaborationRouter } from "./api/router/collaboration-router";
import { errorHandler } from "./api/middleware/handle-error";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Success check message" });
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/documents", asyncPadDocumentRouter);
app.use("/api/collaborations", collaborationRouter);

app.use(errorHandler);

export default app;
