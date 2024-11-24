import { isAxiosError } from "axios";

import { AppLocale } from "@/features/common/constants/common.constants";
import { BffSuccessResponse } from "@/features/common/types/api.types";

import { axios } from "../clients/axios.client";
import { Cart } from "../types/cart.type";
import { LineItem } from "../types/line-item.type";

export type UpdateCartPayload = {
  cartId: string;
  lineItems: Pick<LineItem, "id" | "quantity">[];
  locale: AppLocale;
  token: string | null;
};

export type UpdateCartResponse = BffSuccessResponse<Cart>;

function getApiUrl(cartId: string) {
  return `/${cartId}`;
}

export async function updateCart({ cartId, lineItems, locale, token }: UpdateCartPayload) {
  try {
    const { data } = await axios.put<UpdateCartResponse>(
      getApiUrl(cartId),
      {
        lineItems: {
          updates: lineItems,
        },
      },
      {
        params: {
          locale,
        },
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      // TODO: Handle specific error
      throw error;
    }

    throw error;
  }
}
