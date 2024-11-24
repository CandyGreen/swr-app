import { DeepPartial } from "@/features/common/types/common.types";
import { Context } from "@/features/common/types/context.type";
import { handleValidationError } from "@/features/common/utils/handle-validation-error.util";

import { CartApiErrorCode } from "../../constants/cart-api-error-code.constants";
import { getCartByIdService } from "../../services/get-cart-by-id";
import { Cart } from "../../types/cart.type";
import { getCartControllerPayloadSchema as schema } from "./get-cart.schema";
import { GetCartControllerPayload } from "./get-cart.types";

export type GetCartControllerResponse = Cart;

export async function getCartController(
  context: Context,
  payload: DeepPartial<GetCartControllerPayload>,
): Promise<GetCartControllerResponse> {
  try {
    const { params } = schema.parse(payload);

    return await getCartByIdService(context, params);
  } catch (error) {
    handleValidationError(error, {
      code: CartApiErrorCode.INVALID_GET_CART_REQUEST_PAYLOAD,
    });
  }
}
