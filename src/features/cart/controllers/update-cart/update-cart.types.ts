import { z } from "zod";

import { updateCartControllerPayloadSchema } from "./update-cart.schema";

export type UpdateCartControllerPayload = z.infer<typeof updateCartControllerPayloadSchema>;
