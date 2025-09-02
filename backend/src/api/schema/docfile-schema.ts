import { z } from "zod";

export const docfileCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "name is required")
    .max(100, "name cannot exceeds the length of 100"),
  content: z.string().min(1, "content is required"),
});

export const docfileUpdateSchema = z.object({
  name: z.string().trim().max(100, "name cannot exceeds the length of 100"),
  content: z.string(),
});
