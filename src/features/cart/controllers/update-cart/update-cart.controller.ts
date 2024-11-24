import { DeepPartial } from "@/features/common/types/common.types";
import { Context } from "@/features/common/types/context.type";
import { handleValidationError } from "@/features/common/utils/handle-validation-error.util";

import { CartApiErrorCode } from "../../constants/cart-api-error-code.constants";
import { updateCartService } from "../../services/update-cart";
import { Cart } from "../../types/cart.type";
import { updateCartControllerPayloadSchema as schema } from "./update-cart.schema";
import { UpdateCartControllerPayload } from "./update-cart.types";

type UpdateCartControllerResponse = Cart;

export async function updateCartController(
  context: Context,
  payload: DeepPartial<UpdateCartControllerPayload>,
): Promise<UpdateCartControllerResponse> {
  try {
    const { params, body } = schema.parse(payload);

    return await updateCartService(context, {
      cartId: params.cartId,
      lineItems: body.lineItems,
    });
  } catch (error) {
    handleValidationError(error, {
      code: CartApiErrorCode.INVALID_UPDATE_CART_REQUEST_PAYLOAD,
    });
  }
}
