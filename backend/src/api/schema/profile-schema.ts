import { z } from "zod";

export const profileUpdateSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long")
    .optional(),
  about: z.string().optional(),
  avatarUrl: z.string().optional(),
  fullname: z.string().trim().min(1, "Full name is required").optional(),
});
