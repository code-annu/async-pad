import z from "zod";

export const inviteSendSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(500, "Message cannot exceeds the length of 500"),
});

export const inviteRespondSchema = z.object({
  accepted: z.boolean(),
});
