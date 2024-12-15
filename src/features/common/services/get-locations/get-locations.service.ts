import { isAxiosError } from "axios";

import { axios } from "../../clients/axios.client";
import { BffSuccessResponse } from "../../types/api.types";
import { Coordinates } from "../../types/common.types";
import { Location } from "../../types/location.types";

export type GetLocationsPayload = {
  query: string;
  coordinates?: Coordinates;
};

export type GetLocationsResponse = BffSuccessResponse<Location[]>;

export async function getLocations({ query, coordinates }: GetLocationsPayload) {
  try {
    const { data } = await axios.get<GetLocationsResponse>("/locations", {
      params: {
        query,
        coordinates,
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
