import { LocationType } from "../constants/location.constants";
import { StationType } from "../constants/station.constants";
import { Coordinates } from "./common.types";

type BaseLocation = {
  id: string;
  name: string;
  coordinates: Coordinates;
};

export type AddressLocation = BaseLocation & {
  type: LocationType.ADDRESS;
};

export type PoiLocation = BaseLocation & {
  type: LocationType.POI;
};

export type StationLocation = BaseLocation & {
  type: LocationType.STATION;
  details: {
    code: string;
    type: StationType;
  };
};

export type Location = AddressLocation | PoiLocation | StationLocation;
