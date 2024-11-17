import { useEffect, useMemo } from "react";

import {
  UseUpdateCartMutationConfig,
  UseUpdateCartMutationPayload,
  useUpdateCartMutation,
} from "../hooks/use-update-cart-mutation.hook";
import { GetCartResponse } from "../services/get-cart.service";

type RefreshCartPricesContainerProps = {
  cart: GetCartResponse | undefined;
  children: () => JSX.Element;
};

const CONFIG: UseUpdateCartMutationConfig = {
  populateCache: true,
  revalidate: false,
};

export function RefreshCartPricesContainer({ cart, children }: RefreshCartPricesContainerProps) {
  const { trigger: updateCart } = useUpdateCartMutation(null, CONFIG);

  const payload = useMemo<UseUpdateCartMutationPayload | null>(() => {
    if (!cart) return null;

    const staleLineItems = cart.data.lineItems
      .filter((lineItem) => !lineItem.isValidated)
      .map((lineItem) => ({
        id: lineItem.id,
        quantity: lineItem.quantity,
      }));

    if (!staleLineItems.length) return null;

    return {
      cartId: cart.data.id,
      lineItems: staleLineItems,
    };
  }, [cart]);

  useEffect(() => {
    if (!payload) return;

    (async () => {
      try {
        await updateCart(payload);
      } catch {
        // Do nothing
      }
    })();
  }, [payload, updateCart]);

  return children();
}
