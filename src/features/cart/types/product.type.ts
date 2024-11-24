import { z } from "zod";

import { productSchema } from "../schemas/product.schema";

export type Product = z.infer<typeof productSchema>;
