import { z } from "zod";

export const productSchema = z.object({
  id: z.number().int().positive(),
  content: z.object({
    name: z.string(),
    description: z.string(),
  }),
});
