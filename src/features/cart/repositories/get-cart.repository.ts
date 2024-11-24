import { HttpStatusCode } from "@/features/common/constants/common.constants";
import { Context } from "@/features/common/types/context.type";
import { handleValidationError } from "@/features/common/utils/handle-validation-error.util";
import { HttpError } from "@/features/common/utils/http-error.util";
import { readFile } from "@/features/common/utils/read-file.util";

import { CartApiErrorCode } from "../constants/cart-api-error-code.constants";
import { cartSchema } from "../schemas/cart.schema";
import { Cart } from "../types/cart.type";

type GetCartRepositoryPayload = {
  cartId: string;
};

type GetCartRepositoryResponse = Cart;

export async function getCartRepository(
  _context: Context,
  { cartId }: GetCartRepositoryPayload,
): Promise<GetCartRepositoryResponse> {
  const data = await readFile(`/public/database/carts/${cartId}.json`);

  if (!data) {
    throw new HttpError("Cart is not found", {
      status: HttpStatusCode.NOT_FOUND,
      code: CartApiErrorCode.CART_NOT_FOUND,
    });
  }

  try {
    return cartSchema.parse(JSON.parse(data));
  } catch (error) {
    handleValidationError(error, {
      code: CartApiErrorCode.INVALID_CART_DATA,
    });
  }
}
