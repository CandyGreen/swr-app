import { Location } from "./location.types";

export type AutocompleteItem = {
  id: string;
  label: string;
};

export type AutocompleteLocation = AutocompleteItem & {
  source: Location;
};
