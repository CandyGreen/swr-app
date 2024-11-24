import { AppLocale } from "../constants/common.constants";
import { Money } from "../types/money.type";

const LOCALES_MAP = {
  [AppLocale.EN]: "en-US",
  [AppLocale.FR]: "fr-CA",
};

export function formatPrice(price: Money, locale: AppLocale) {
  const formatter = new Intl.NumberFormat(LOCALES_MAP[locale], {
    style: "currency",
    currency: price.currency,
  });

  return formatter.format(price.value);
}
