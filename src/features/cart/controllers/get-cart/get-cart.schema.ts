import { z } from "zod";

export const getCartControllerPayloadSchema = z.object({
  params: z.object({
    cartId: z.string().uuid(),
  }),
});
