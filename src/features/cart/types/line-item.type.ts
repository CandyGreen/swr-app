import { z } from "zod";

import { lineItemSchema } from "../schemas/line-item.schema";

export type LineItem = z.infer<typeof lineItemSchema>;
