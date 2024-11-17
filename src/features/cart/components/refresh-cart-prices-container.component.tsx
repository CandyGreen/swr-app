import { useEffect } from "react";

import { AppLocale } from "@/features/common/constants/common.constants";

import { GetCartResponse } from "../services/get-cart.service";
import { updateCart } from "../services/update-cart.service";

type RefreshCartPricesContainerProps = {
  cart: GetCartResponse | undefined;
  children: () => JSX.Element;
};

export function RefreshCartPricesContainer({ cart, children }: RefreshCartPricesContainerProps) {
  useEffect(() => {
    if (!cart) return;

    (async () => {
      try {
        await updateCart({
          cartId: cart.data.id,
          locale: AppLocale.EN,
          token: null,
        });
      } catch {
        // Do nothing
      }
    })();
  }, [cart]);

  return children();
}
