import { z } from "zod";
import { CollaborationRole } from "../../domain/entities/collaboration-entity";

export const collaborationSendSchema = z.object({
  username: z.string().min(1, "Username is required"),
  role: z
    .enum(CollaborationRole)
    .nonoptional("role is required [viewer/editor]"),
});

export const collaborationUpdateSchema = z.object({
  role: z
    .enum(CollaborationRole)
    .nonoptional("role is required [viewer/editor]"),
});

export const collaborationReactSchema = z.object({
  accept: z.boolean().nonoptional("accept is required"),
});
