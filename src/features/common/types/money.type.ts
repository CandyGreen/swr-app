import { z } from "zod";

import { moneySchema } from "../schemas/money.schema";

export type Money = z.infer<typeof moneySchema>;
