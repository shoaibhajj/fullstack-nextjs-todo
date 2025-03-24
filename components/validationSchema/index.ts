import { z } from "zod";
export const todoFormSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "title must be at least 3 characters.",
    })
    .max(20, {
      message: "title must not be longer than 20 characters.",
    }),
  body: z
    .string()
    .max(80, {
      message: "description  must not be longer than 80 characters.",
    })
    .optional(),
  completed: z.boolean(),
});
