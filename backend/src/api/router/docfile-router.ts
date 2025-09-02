import { DocfileController } from "../controller/docfile-controller";
import { Router } from "express";
import {
  docfileCreateSchema,
  docfileUpdateSchema,
} from "../schema/docfile-schema";
import { validateRequestBody } from "../middleware/validate-request-body";

export const docfileRouter = Router({ mergeParams: true });
const docfileController = new DocfileController();

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
