import { z } from "zod";

export const customerSchema = z.object({
  id: z.string().uuid(),
});
