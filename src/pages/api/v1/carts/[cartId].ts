import type { NextApiRequest, NextApiResponse } from "next";

import { updateCartController } from "@/features/cart/controllers/update-cart";
import { Cart } from "@/features/cart/types/cart.type";
import { createCartCookie } from "@/features/cart/utils/create-cart-cookie.util";
import { deleteCartCookie } from "@/features/cart/utils/delete-cart-cookie.util";
import { HttpMethod, HttpStatusCode } from "@/features/common/constants/common.constants";
import { withDelay } from "@/features/common/middlewares/with-delay.middleware";
import { withErrorBoundary } from "@/features/common/middlewares/with-error-boundary.middleware";
import { withRequestMethods } from "@/features/common/middlewares/with-request-methods.middleware";
import { BffFailureResponse, BffSuccessResponse } from "@/features/common/types/api.types";
import { Context } from "@/features/common/types/context.type";
import { applyMiddlewares } from "@/features/common/utils/apply-middlewares.util";
import { isHttpError } from "@/features/common/utils/is-http-error.util";

type UpdateCartHandlerResponse = BffSuccessResponse<Cart> | BffFailureResponse;

const CUSTOMER_ID = "7b3e0d14-f1b0-4bc8-b7d1-6235cbce9a2a";

async function updateCartHandler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateCartHandlerResponse>,
) {
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
    const cart = await updateCartController(context, {
      params: req.query,
      body: req.body,
    });

    res.setHeader("Set-Cookie", createCartCookie(cart.id));
    res.status(HttpStatusCode.OK).json({ data: cart, metadata: {} });
  } catch (error) {
    if (isHttpError(error) && error.status === HttpStatusCode.NOT_FOUND) {
      res.setHeader("Set-Cookie", deleteCartCookie());
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
    }

    throw error;
  }
}

export default applyMiddlewares(updateCartHandler, [
  withErrorBoundary,
  withRequestMethods([HttpMethod.PUT]),
  withDelay(500),
]);
