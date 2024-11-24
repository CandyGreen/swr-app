import { Context } from "@/features/common/types/context.type";
import { handleValidationError } from "@/features/common/utils/handle-validation-error.util";
import { writeFile } from "@/features/common/utils/write-file.util";

import { CartApiErrorCode } from "../constants/cart-api-error-code.constants";
import { cartSchema } from "../schemas/cart.schema";
import { Cart } from "../types/cart.type";

type UpdateCartRepositoryPayload = {
  cart: Cart;
};

type UpdateCartRepositoryResponse = Cart;

export async function updateCartRepository(
  _context: Context,
  { cart: data }: UpdateCartRepositoryPayload,
): Promise<UpdateCartRepositoryResponse> {
  try {
    const cart = cartSchema.parse(data);

    await writeFile(`/public/database/carts/${cart.id}.json`, JSON.stringify(cart, null, 2));

    return cart;
  } catch (error) {
    handleValidationError(error, {
      code: CartApiErrorCode.INVALID_CART_DATA,
    });
  }
}
