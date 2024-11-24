import { serialize } from "cookie";

import { CART_COOKIE_KEY } from "../constants/cookie.constants";

export function deleteCartCookie() {
  return serialize(CART_COOKIE_KEY, "", {
    path: "/",
    sameSite: true,
    secure: true,
    httpOnly: true,
    maxAge: 0,
    expires: new Date(0),
  });
}
