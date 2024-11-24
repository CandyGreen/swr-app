import { z } from "zod";

import { moneySchema } from "@/features/common/schemas/money.schema";

import { productSchema } from "./product.schema";

export const lineItemSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.object({
    unit: z.object({
      base: moneySchema,
      selling: moneySchema,
    }),
    total: z.object({
      base: moneySchema,
      selling: moneySchema,
    }),
  }),
  product: productSchema,
  isValidated: z.boolean(),
});
