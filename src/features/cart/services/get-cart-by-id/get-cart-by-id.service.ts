import { HttpStatusCode } from "@/features/common/constants/common.constants";
import { Context } from "@/features/common/types/context.type";
import { HttpError } from "@/features/common/utils/http-error.util";

import { CartApiErrorCode } from "../../constants/cart-api-error-code.constants";
import { getCartRepository } from "../../repositories/get-cart.repository";
import { Cart } from "../../types/cart.type";

type GetCartByIdServicePayload = {
  cartId: string;
};

type GetCartByIdResponse = Cart;

export async function getCartByIdService(
  context: Context,
  payload: GetCartByIdServicePayload,
): Promise<GetCartByIdResponse> {
  const cart = await getCartRepository(context, payload);

  if (cart.customer && cart.customer.id !== context.auth.identity?.id) {
    throw new HttpError("Access to the cart is denied", {
      status: HttpStatusCode.FORBIDDEN,
      code: CartApiErrorCode.CART_ACCESS_DENIED,
    });
  }

  return cart;
}
