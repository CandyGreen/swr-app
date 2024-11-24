import { z } from "zod";

import { customerSchema } from "@/features/common/schemas/customer.schema";
import { moneySchema } from "@/features/common/schemas/money.schema";

import { lineItemSchema } from "./line-item.schema";

export const cartSchema = z.object({
  id: z.string().uuid(),
  lineItems: z.array(lineItemSchema).min(1),
  price: moneySchema,
  customer: customerSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
