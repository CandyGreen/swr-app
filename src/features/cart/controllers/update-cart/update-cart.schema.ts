import { z } from "zod";

import { lineItemSchema } from "../../schemas/line-item.schema";

export const updateCartControllerPayloadSchema = z.object({
  params: z.object({
    cartId: z.string().uuid(),
  }),
  body: z.object({
    lineItems: z.object({
      updates: z.array(lineItemSchema.pick({ id: true, quantity: true })).min(1),
    }),
  }),
});
