import { Router } from "express";
import { container } from "../../di/config.inversify";
import { TYPES } from "../../di/types";
import { ProfileController } from "../controller/ProfileController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import { profileUpdateSchema } from "../schema/profile-schema";

const profileRouter = Router();
const controller = container.get<ProfileController>(TYPES.ProfileController);

// Protected routes
profileRouter.get(
  "/me",
  validateAuthorization,
  controller.getMe.bind(controller)
);
profileRouter.patch(
  "/me",
  validateAuthorization,
  validateRequestBody(profileUpdateSchema),
  controller.updateMe.bind(controller)
);
profileRouter.delete(
  "/me",
  validateAuthorization,
  controller.deleteMe.bind(controller)
);


export { profileRouter };
