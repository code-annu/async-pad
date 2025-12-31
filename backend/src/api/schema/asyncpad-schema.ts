import { z } from "zod";

export const createAsyncPadDocumentSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  currentContent: z.string().trim().min(1, "Content is required"),
});

export const updateAsyncPadDocumentSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  currentContent: z.string().trim().optional(),
});
