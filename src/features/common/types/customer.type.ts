import { z } from "zod";

import { customerSchema } from "../schemas/customer.schema";

export type Customer = z.infer<typeof customerSchema>;
