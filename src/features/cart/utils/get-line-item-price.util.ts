import { Price } from "@/features/common/types/price.type";

export function getLineItemPrice(price: Price, quantity: number): Price {
  return {
    base: {
      ...price.base,
      value: price.base.value * quantity,
    },
    selling: {
      ...price.selling,
      value: price.base.value * quantity,
    },
  };
}
