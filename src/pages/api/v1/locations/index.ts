import { isEqual } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import { z } from "zod";

import {
  CacheControl,
  HttpMethod,
  HttpStatusCode,
} from "@/features/common/constants/common.constants";
import { LocationType } from "@/features/common/constants/location.constants";
import { StationType } from "@/features/common/constants/station.constants";
import { withCacheControl } from "@/features/common/middlewares/with-cache-control.middleware";
import { withDelay } from "@/features/common/middlewares/with-delay.middleware";
import { withErrorBoundary } from "@/features/common/middlewares/with-error-boundary.middleware";
import { withRequestMethods } from "@/features/common/middlewares/with-request-methods.middleware";
import { BffFailureResponse, BffSuccessResponse } from "@/features/common/types/api.types";
import { Location } from "@/features/common/types/location.types";
import { applyMiddlewares } from "@/features/common/utils/apply-middlewares.util";

type GetLocationsHandlerResponse = BffSuccessResponse<Location[]> | BffFailureResponse;

const getLocationsHandlerQuerySchema = z
  .object({
    query: z.string(),
    coordinates: z
      .object({
        lat: z.coerce.number(),
        lng: z.coerce.number(),
      })
      .strict()
      .optional(),
  })
  .strict();

const LOCATIONS: Location[] = [
  {
    id: "location-id-1",
    type: LocationType.STATION,
    name: "Union Station GO",
    coordinates: {
      lat: 33.5,
      lng: -78.5,
    },
    details: {
      code: "UN",
      type: StationType.TRAIN_AND_BUS,
    },
  },
  {
    id: "location-id-2",
    type: LocationType.STATION,
    name: "Richmond Hill GO",
    coordinates: {
      lat: 45.7,
      lng: -75.7,
    },
    details: {
      code: "RI",
      type: StationType.TRAIN,
    },
  },
  {
    id: "location-id-3",
    type: LocationType.STATION,
    name: "Milton GO",
    coordinates: {
      lat: 12.3,
      lng: -61.3,
    },
    details: {
      code: "MI",
      type: StationType.BUS,
    },
  },
  {
    id: "location-id-4",
    type: LocationType.ADDRESS,
    name: "Main street, 189",
    coordinates: {
      lat: 24.8,
      lng: 32.1,
    },
  },
  {
    id: "location-id-5",
    type: LocationType.STATION,
    name: "Ajax GO",
    coordinates: {
      lat: 24.8,
      lng: 32.1,
    },
    details: {
      code: "AJ",
      type: StationType.TRAIN,
    },
  },
  {
    id: "location-id-6",
    type: LocationType.STATION,
    name: "Clarkson GO",
    coordinates: {
      lat: 24.8,
      lng: 32.1,
    },
    details: {
      code: "CL",
      type: StationType.TRAIN_AND_BUS,
    },
  },
];

function getFilteredLocations(params: z.infer<typeof getLocationsHandlerQuerySchema>) {
  if (params.query) {
    const locations = LOCATIONS.filter((l) => l.name === params.query);

    return locations.length === 0 ? LOCATIONS : locations;
  }

  if (params.coordinates) {
    return LOCATIONS.filter((l) => {
      const isStation = l.type === LocationType.STATION;

      return isStation && isEqual(l.coordinates, params.coordinates);
    });
  }

  return LOCATIONS;
}

async function getLocationsHandler(
  req: NextApiRequest,
  res: NextApiResponse<GetLocationsHandlerResponse>,
) {
  const query = qs.parse(req.query as Record<string, string>);
  const params = getLocationsHandlerQuerySchema.parse(query);
  const locations = getFilteredLocations(params);

  res.status(HttpStatusCode.OK).json({ data: locations, metadata: {} });
}

export default applyMiddlewares(getLocationsHandler, [
  withErrorBoundary,
  withRequestMethods([HttpMethod.GET]),
  withCacheControl(CacheControl.NO_CACHE),
  withDelay(500),
]);
