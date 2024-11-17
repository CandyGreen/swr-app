import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";

import { useAppLocale } from "@/features/common/hooks/use-app-locale.hook";

import { UpdateCartPayload, UpdateCartResponse, updateCart } from "../services/update-cart.service";
import { getCacheKey } from "./use-cart-query.hook";

export type UseUpdateCartMutationPayload = Pick<UpdateCartPayload, "cartId" | "lineItems">;

export type UseUpdateCartMutationConfig = Omit<
  SWRMutationConfiguration<
    UpdateCartResponse,
    Error,
    ReturnType<typeof getCacheKey>,
    UseUpdateCartMutationPayload
  >,
  "fetcher"
>;

export function useUpdateCartMutation(token: string | null, config?: UseUpdateCartMutationConfig) {
  const locale = useAppLocale();

  return useSWRMutation(
    getCacheKey({ token, locale }),
    (key, { arg }) => {
      const [, payload] = key;

      return updateCart({ ...payload, ...arg });
    },
    config,
  );
}
