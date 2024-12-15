import { ReactNode, useState } from "react";
import { useDebounce } from "use-debounce";

import { LocationType } from "../constants/location.constants";
import {
  UseLocationsQueryData,
  UseLocationsQueryInput,
  useLocationsQuery,
} from "../hooks/use-locations-query.hook";
import { AutocompleteLocation } from "../types/autocomplete.types";

type LocationSearchContainerChildrenProps = {
  locations: UseLocationsQueryData["data"] | undefined;
  isLoading: boolean;
  isError: boolean;
  onQueryChange: (query: string) => void;
  onLocationSelect: (location: AutocompleteLocation | null) => void;
};

type LocationSearchContainerProps = {
  children: (props: LocationSearchContainerChildrenProps) => ReactNode;
};

function getLocationsInput(
  query: string,
  location: AutocompleteLocation | null,
): UseLocationsQueryInput | null {
  if (
    location?.source.type === LocationType.ADDRESS ||
    location?.source.type === LocationType.POI
  ) {
    return {
      query: "",
      coordinates: location.source.coordinates,
    };
  }

  if (query.length > 2) {
    return {
      query,
    };
  }

  return null;
}

export function LocationSearchContainer({ children }: LocationSearchContainerProps) {
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<AutocompleteLocation | null>(null);

  const [debouncedQuery] = useDebounce(query, 500);

  const {
    data: response,
    error,
    isLoading,
  } = useLocationsQuery(getLocationsInput(debouncedQuery, selectedLocation));

  return children({
    locations: response?.data,
    isLoading,
    isError: !!error,
    onQueryChange: setQuery,
    onLocationSelect: setSelectedLocation,
  });
}
