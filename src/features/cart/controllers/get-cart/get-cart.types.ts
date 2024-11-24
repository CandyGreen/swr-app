import { z } from "zod";

import { getCartControllerPayloadSchema } from "./get-cart.schema";

export type GetCartControllerPayload = z.infer<typeof getCartControllerPayloadSchema>;
