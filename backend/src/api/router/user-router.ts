import { UserController } from "../controller/user-controller";
import { Router } from "express";

export const userRouter = Router({ mergeParams: true });
const userController = new UserController();

userRouter.get("/", userController.userProfileGet.bind(userController));
userRouter.get(
  "/documents",
  userController.userDocfilesGet.bind(userController)
);
