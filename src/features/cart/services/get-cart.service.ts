import { isAxiosError } from "axios";

import { AppLocale } from "@/features/common/constants/common.constants";
import { BffSuccessResponse } from "@/features/common/types/api.types";

import { axios } from "../clients/axios.client";
import { Cart } from "../types/cart.type";

export type GetCartPayload = {
  token: string | null;
  locale: AppLocale;
};

export type GetCartResponse = BffSuccessResponse<Cart>;

const API_URL = "/current";

export async function getCart({ locale, token }: GetCartPayload) {
  try {
    const { data } = await axios.get<GetCartResponse>(API_URL, {
      params: {
        locale,
      },
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      // TODO: Handle specific error
      throw error;
    }

    throw error;
  }
}
