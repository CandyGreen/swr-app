import useSWR, { SWRConfiguration } from "swr";

import { useAppLocale } from "@/features/common/hooks/use-app-locale.hook";

import { GetCartPayload, GetCartResponse, getCart } from "../services/get-cart.service";

export type UseCartQueryData = GetCartResponse;

export type UseCartQueryConfig = SWRConfiguration<UseCartQueryData> & {
  enabled?: boolean;
};

export function getCacheKey(payload: GetCartPayload) {
  return ["cart", payload] as const;
}

export function useCartQuery(token: string | null, config: UseCartQueryConfig = {}) {
  const { enabled = true, ...otherConfig } = config;

  const locale = useAppLocale();

  return useSWR(
    enabled ? getCacheKey({ locale, token }) : null,
    (key) => {
      const [, payload] = key;

      return getCart(payload);
    },
    otherConfig,
  );
}
