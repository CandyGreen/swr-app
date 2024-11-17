import type { NextApiRequest, NextApiResponse } from "next";

import { Cart } from "@/features/cart/types/cart.types";
import { Currency, HttpStatusCode } from "@/features/common/constants/common.constants";
import { BffFailureResponse, BffSuccessResponse } from "@/features/common/types/common.types";
import { sleep } from "@/features/common/utils/sleep.util";

type GetCartHandlerResponse = BffSuccessResponse<Cart> | BffFailureResponse;

const STATIC_CART: Cart = {
  id: "8028d451-4c70-4a6c-86fb-c30d7a65a73f",
  lineItems: [
    {
      id: "715d0ea1-2bbf-4f06-9eaa-c17a9a31de22",
      quantity: 2,
      price: {
        unit: {
          base: {
            currency: Currency.USD,
            value: 10,
          },
          selling: {
            currency: Currency.USD,
            value: 10,
          },
        },
        total: {
          base: {
            currency: Currency.USD,
            value: 20,
          },
          selling: {
            currency: Currency.USD,
            value: 20,
          },
        },
      },
      product: {
        id: 1,
        content: {
          name: "Product A name",
          description: "Product A description",
        },
      },
    },
    {
      id: "83a21359-4835-49d4-ad82-f4082294443c",
      quantity: 1,
      price: {
        unit: {
          base: {
            currency: Currency.USD,
            value: 5,
          },
          selling: {
            currency: Currency.USD,
            value: 5,
          },
        },
        total: {
          base: {
            currency: Currency.USD,
            value: 5,
          },
          selling: {
            currency: Currency.USD,
            value: 5,
          },
        },
      },
      product: {
        id: 2,
        content: {
          name: "Product B name",
          description: "Product B description",
        },
      },
    },
  ],
  price: {
    currency: Currency.USD,
    value: 25,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<GetCartHandlerResponse>,
) {
  await sleep(2000);

  res.status(HttpStatusCode.OK).json({
    data: STATIC_CART,
    metadata: {},
  });
}
