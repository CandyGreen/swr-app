import { useCombobox } from "downshift";
import { useMemo } from "react";

import { LocationType } from "../constants/location.constants";
import { StationType } from "../constants/station.constants";
import { AutocompleteLocation } from "../types/autocomplete.types";
import { Location, StationLocation } from "../types/location.types";
import { Autocomplete, AutocompleteProps } from "./autocomplete.component";

type LocationSearchAutocompleteProps = {
  locations: Location[] | undefined;
  onInputValueChange: AutocompleteProps<AutocompleteLocation>["onInputValueChange"];
  onSelectedItemChange: AutocompleteProps<AutocompleteLocation>["onSelectedItemChange"];
};

function getStationType(station: StationLocation) {
  switch (station.details.type) {
    case StationType.TRAIN:
      return "Train";

    case StationType.BUS:
      return "Bus";

    case StationType.TRAIN_AND_BUS:
      return "Train and bus";
  }
}

const stateReducer: AutocompleteProps<AutocompleteLocation>["stateReducer"] = (
  _state,
  actionAndChanges,
) => {
  const { type, changes } = actionAndChanges;

  switch (type) {
    case useCombobox.stateChangeTypes.ItemClick:
    case useCombobox.stateChangeTypes.InputKeyDownEnter: {
      const { selectedItem, ...otherChanges } = changes;

      const isOpen = selectedItem?.source.type !== LocationType.STATION;

      return { ...otherChanges, selectedItem, isOpen };
    }

    default:
      return changes;
  }
};

export function LocationSearchAutocomplete({
  locations,
  ...props
}: LocationSearchAutocompleteProps) {
  const items = useMemo<AutocompleteLocation[]>(() => {
    if (!locations) return [];

    return locations.map((location) => ({
      id: location.id,
      label: location.name,
      source: location,
    }));
  }, [locations]);

  return (
    <Autocomplete
      {...props}
      items={items}
      stateReducer={stateReducer}
      renderLabel={(props) => <label {...props}>Select a location:</label>}
      renderInput={(props) => <input {...props} placeholder="Search a location" />}
      renderItem={(item) => (
        <div className="flex flex-col">
          <span>{item.label}</span>

          {item.source.type === LocationType.STATION && (
            <span className="text-xs text-gray-500">{getStationType(item.source)}</span>
          )}

          <span className="text-xs text-gray-500">
            {item.source.coordinates.lat}, {item.source.coordinates.lng}
          </span>
        </div>
      )}
    />
  );
}
