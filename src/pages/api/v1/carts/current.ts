import type { NextApiRequest, NextApiResponse } from "next";

import { CART_COOKIE_KEY } from "@/features/cart/constants/cookie.constants";
import { getCartController } from "@/features/cart/controllers/get-cart";
import { Cart } from "@/features/cart/types/cart.type";
import {
  CacheControl,
  HttpMethod,
  HttpStatusCode,
} from "@/features/common/constants/common.constants";
import { withCacheControl } from "@/features/common/middlewares/with-cache-control.middleware";
import { withDelay } from "@/features/common/middlewares/with-delay.middleware";
import { withErrorBoundary } from "@/features/common/middlewares/with-error-boundary.middleware";
import { withRequestMethods } from "@/features/common/middlewares/with-request-methods.middleware";
import { BffFailureResponse, BffSuccessResponse } from "@/features/common/types/api.types";
import { Context } from "@/features/common/types/context.type";
import { applyMiddlewares } from "@/features/common/utils/apply-middlewares.util";
import { isHttpError } from "@/features/common/utils/is-http-error.util";

type GetCartHandlerResponse = BffSuccessResponse<Cart> | BffFailureResponse;

const CUSTOMER_ID = "7b3e0d14-f1b0-4bc8-b7d1-6235cbce9a2a";

async function getCartHandler(req: NextApiRequest, res: NextApiResponse<GetCartHandlerResponse>) {
  const context: Context = {
    auth: {
      identity: {
        id: CUSTOMER_ID,
      },
    },
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
  };

  try {
    const cart = await getCartController(context, {
      params: {
        cartId: req.cookies[CART_COOKIE_KEY],
      },
    });

    res.status(HttpStatusCode.OK).json({ data: cart, metadata: {} });
  } catch (error) {
    if (isHttpError(error) && error.status === HttpStatusCode.NOT_FOUND) {
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
    }

    throw error;
  }
}

export default applyMiddlewares(getCartHandler, [
  withErrorBoundary,
  withRequestMethods([HttpMethod.GET]),
  withCacheControl(CacheControl.NO_CACHE),
  withDelay(500),
]);
