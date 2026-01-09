import { Router } from "express";
import { container } from "../../di/config.inversify";
import { TYPES } from "../../di/types";
import { AsyncPadDocumentController } from "../controller/AsyncPadDocumentController";
import { validateAuthorization } from "../middleware/validate-authorization";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  createAsyncPadDocumentSchema,
  updateAsyncPadDocumentSchema,
} from "../schema/asyncpad-schema";
import { CollaborationController } from "../controller/CollaborationController";
import { collaborationSendSchema } from "../schema/collaboration-schema";

const asyncPadDocumentRouter = Router();
const controller = container.get<AsyncPadDocumentController>(
  TYPES.AsyncPadDocumentController
);
const collaborationController = container.get<CollaborationController>(
  TYPES.CollaborationController
);

asyncPadDocumentRouter.use(validateAuthorization);

asyncPadDocumentRouter.post(
  "/",
  validateRequestBody(createAsyncPadDocumentSchema),
  controller.create.bind(controller)
);

asyncPadDocumentRouter.get("/", controller.getUserDocuments.bind(controller));

asyncPadDocumentRouter.get("/:id", controller.get.bind(controller));

asyncPadDocumentRouter.patch(
  "/:id",
  validateRequestBody(updateAsyncPadDocumentSchema),
  controller.update.bind(controller)
);

asyncPadDocumentRouter.delete("/:id", controller.delete.bind(controller));

asyncPadDocumentRouter.post(
  "/:id/collaborations",
  validateRequestBody(collaborationSendSchema),
  (req, res, next) => {
    req.body.documentId = req.params.id;
    collaborationController.sendInvitation(req, res, next);
  }
);

asyncPadDocumentRouter.get(
  "/:id/collaborations",
  collaborationController.getDocumentCollaborations.bind(
    collaborationController
  )
);

export { asyncPadDocumentRouter };
