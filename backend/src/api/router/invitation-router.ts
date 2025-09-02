import { InvitationController } from "../controller/invitation-controller";
import { validateRequestBody } from "../middleware/validate-request-body";
import { inviteRespondSchema } from "../schema/invitation-schema";
import { Router } from "express";

export const invitationRouter = Router();
const invitationController = new InvitationController();

invitationRouter.patch(
  "/:invitationId/respond",
  validateRequestBody(inviteRespondSchema),
  invitationController.invitationRespondPatch.bind(invitationController)
);
