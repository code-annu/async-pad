import { InvitationController } from "../controller/invitation-controller";
import { UserController } from "../controller/user-controller";
import { validateRequestBody } from "../middleware/validate-request-body";
import { inviteRespondSchema } from "../schema/invitation-schema";
import { Router } from "express";

export const invitationRouter = Router();
const invitationController = new InvitationController();
const userController = new UserController();

invitationRouter.patch(
  "/:invitationId/respond",
  validateRequestBody(inviteRespondSchema),
  invitationController.invitationRespondPatch.bind(invitationController)
);

invitationRouter.get(
  "/:invitationId",
  invitationController.invitationGet.bind(invitationController)
);

invitationRouter.get(
  "/",
  userController.userInvitationsGet.bind(userController)
);
