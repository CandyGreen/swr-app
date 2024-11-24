import { Currency } from "@/features/common/constants/common.constants";
import { Money } from "@/features/common/types/money.type";

import { LineItem } from "../types/line-item.type";

export function getCartPrice(lineItems: LineItem[]): Money {
  return lineItems.reduce<Money>(
    (price, lineItem) => {
      price.value += lineItem.price.total.selling.value;
      price.currency = lineItem.price.total.selling.currency;

      return price;
    },
    { currency: Currency.USD, value: 0 },
  );
}
