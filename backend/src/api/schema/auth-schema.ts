import { z } from "zod";

const usernameRegex = /^[a-zA-Z0-9_-]+$/;

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .regex(
      usernameRegex,
      "Username may only contain letters, numbers, hyphens (-), or underscores (_), and no spaces"
    ),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must not exceed 100 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .regex(
      usernameRegex,
      "Username may only contain letters, numbers, hyphens (-), or underscores (_), and no spaces"
    ),
  password: z.string().trim().min(1, "Password is required"),
});
