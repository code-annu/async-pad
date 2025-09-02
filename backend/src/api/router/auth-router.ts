import { AuthController } from "../controller/auth-controller";
import { Router } from "express";
import { validateRequestBody } from "../middleware/validate-request-body";
import { registerSchema, loginSchema } from "../schema/auth-schema";

export const authRouter = Router();
const authController = new AuthController();

authRouter.post(
  "/register",
  validateRequestBody(registerSchema),
  authController.registerPost.bind(authController)
);

authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.loginPost.bind(authController)
);

authRouter.post(
  "/refresh-token",
  authController.refreshTokenPost.bind(authController)
);
