import { isAxiosError } from "axios";

import { AppLocale } from "@/features/common/constants/common.constants";
import { BffSuccessResponse } from "@/features/common/types/common.types";

import { axios } from "../clients/axios.client";
import { Cart } from "../types/cart.types";

type UpdateCartPayload = {
  cartId: string;
  locale: AppLocale;
  token: string | null;
};

export type UpdateCartResponse = BffSuccessResponse<Cart>;

function getApiUrl(cartId: string) {
  return `/${cartId}`;
}

export async function updateCart({ cartId, locale, token }: UpdateCartPayload) {
  try {
    const { data } = await axios.put<UpdateCartResponse>(
      getApiUrl(cartId),
      {
        lineItems: {
          updates: [],
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
