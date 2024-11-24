import { Context } from "@/features/common/types/context.type";
import { Money } from "@/features/common/types/money.type";

import { updateCartRepository } from "../../repositories/update-cart.repository";
import { Cart } from "../../types/cart.type";
import { LineItem } from "../../types/line-item.type";
import { getCartPrice } from "../../utils/get-cart-price.util";
import { getLineItemPrice } from "../../utils/get-line-item-price.util";
import { getCartByIdService } from "../get-cart-by-id";

type UpdateCartServicePayload = {
  cartId: string;
  lineItems: {
    updates: Pick<LineItem, "id" | "quantity">[];
  };
};

type UpdateCartServiceResponse = Cart;

export async function updateCartService(
  context: Context,
  { cartId, lineItems }: UpdateCartServicePayload,
): Promise<UpdateCartServiceResponse> {
  const cart = await getCartByIdService(context, { cartId });

  cart.lineItems.forEach((lineItem) => {
    const item = lineItems.updates.find((update) => update.id === lineItem.id);

    if (!item) return;

    lineItem.quantity = item.quantity;
    lineItem.price.total = getLineItemPrice(lineItem.price.unit, item.quantity);
    lineItem.isValidated = true;
  });

  cart.price = getCartPrice(cart.lineItems);
  cart.updatedAt = new Date().toISOString();

  return updateCartRepository(context, { cart });
}
