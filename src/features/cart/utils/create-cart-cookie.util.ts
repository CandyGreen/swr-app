import { serialize } from "cookie";

import { CART_COOKIE_KEY } from "../constants/cookie.constants";

const MONTH = 60 * 60 * 24 * 30;

export function createCartCookie(cartId: string) {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  return serialize(CART_COOKIE_KEY, cartId, {
    path: "/",
    sameSite: true,
    secure: true,
    httpOnly: true,
    maxAge: MONTH,
    expires: date,
  });
}
