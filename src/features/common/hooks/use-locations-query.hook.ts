import useSWR, { SWRConfiguration } from "swr";

import { GetLocationsResponse, getLocations } from "../services/get-locations";
import { Coordinates } from "../types/common.types";

export type UseLocationsQueryData = GetLocationsResponse;

export type UseLocationsQueryConfig = SWRConfiguration<UseLocationsQueryData, Error> & {
  enabled?: boolean;
};

export type UseLocationsQueryInput = {
  query: string;
  coordinates?: Coordinates;
};

export function getCacheKey(payload: UseLocationsQueryInput) {
  return ["locations", payload] as const;
}

export function useLocationsQuery(
  input: UseLocationsQueryInput | null,
  config: UseLocationsQueryConfig = {},
) {
  const { enabled = true, ...otherConfig } = config;

  return useSWR(
    enabled && input ? getCacheKey(input) : null,
    (key) => {
      const [, payload] = key;

      return getLocations(payload);
    },
    otherConfig,
  );
}
