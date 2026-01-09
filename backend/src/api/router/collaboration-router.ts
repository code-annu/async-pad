import { Router } from "express";
import { container } from "../../di/config.inversify";
import { TYPES } from "../../di/types";
import { CollaborationController } from "../controller/CollaborationController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  collaborationReactSchema,
  collaborationUpdateSchema,
} from "../schema/collaboration-schema";

const collaborationRouter = Router();
const controller = container.get<CollaborationController>(
  TYPES.CollaborationController
);

collaborationRouter.use(validateAuthorization);

collaborationRouter.patch(
  "/:id/react",
  validateRequestBody(collaborationReactSchema),
  controller.reactToInvitation.bind(controller)
);

collaborationRouter.patch(
  "/:id",
  validateRequestBody(collaborationUpdateSchema),
  controller.updateRole.bind(controller)
);

collaborationRouter.get("/:id", controller.get.bind(controller));

collaborationRouter.get("/", controller.getUserCollaborations.bind(controller));

export { collaborationRouter };
