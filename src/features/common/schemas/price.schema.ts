import { z } from "zod";

import { moneySchema } from "./money.schema";

export const priceSchema = z.object({
  base: moneySchema,
  selling: moneySchema,
});
