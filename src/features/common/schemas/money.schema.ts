import { z } from "zod";

import { currencySchema } from "./currency.schema";

export const moneySchema = z.object({
  currency: currencySchema,
  value: z.number(),
});
