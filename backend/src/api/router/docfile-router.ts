import { DocfileController } from "../controller/docfile-controller";
import { Router } from "express";
import {
  docfileCreateSchema,
  docfileUpdateSchema,
} from "../schema/docfile-schema";
import { validateRequestBody } from "../middleware/validate-request-body";
import { InvitationController } from "../controller/invitation-controller";
import { inviteSendSchema } from "../schema/invitation-schema";

export const docfileRouter = Router({ mergeParams: true });
const docfileController = new DocfileController();
const invitationController = new InvitationController();

docfileRouter.post(
  "/",
  validateRequestBody(docfileCreateSchema),
  docfileController.docfilePost.bind(docfileController)
);

docfileRouter.get(
  "/:docfileId",
  docfileController.docfileGet.bind(docfileController)
);

docfileRouter.patch(
  "/:docfileId",
  validateRequestBody(docfileUpdateSchema),
  docfileController.docfilePatch.bind(docfileController)
);

docfileRouter.delete(
  "/:docfileId",
  docfileController.docfileDelete.bind(docfileController)
);

docfileRouter.post(
  "/:docfileId/invite",
  validateRequestBody(inviteSendSchema),
  invitationController.invitationPost.bind(invitationController)
);
