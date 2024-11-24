import { z } from "zod";

import { cartSchema } from "../schemas/cart.schema";

export type Cart = z.infer<typeof cartSchema>;
