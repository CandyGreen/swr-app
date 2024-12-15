import {
  UseComboboxPropGetters,
  UseComboboxProps,
  UseComboboxState,
  UseComboboxStateChangeOptions,
  useCombobox,
} from "downshift";
import { ReactNode } from "react";

import { AutocompleteItem } from "../types/autocomplete.types";
import { cn } from "../utils/cn.util";

type AutocompleteLabelProps<TItem extends AutocompleteItem> = Parameters<
  UseComboboxPropGetters<TItem>["getLabelProps"]
> & {
  className: string;
};

type AutocompleteInputProps<TItem extends AutocompleteItem> = Parameters<
  UseComboboxPropGetters<TItem>["getInputProps"]
> & {
  className: string;
};

export type AutocompleteProps<TItem extends AutocompleteItem> = {
  items: TItem[];
  renderLabel: (props: AutocompleteLabelProps<TItem>) => ReactNode;
  renderInput: (props: AutocompleteInputProps<TItem>) => ReactNode;
  renderItem: (item: TItem) => ReactNode;
  stateReducer?: (
    state: UseComboboxState<TItem>,
    actionAndChanges: UseComboboxStateChangeOptions<TItem>,
  ) => Partial<UseComboboxState<TItem>>;
  itemToString?: UseComboboxProps<TItem>["itemToString"];
  onInputValueChange?: UseComboboxProps<TItem>["onInputValueChange"];
  onSelectedItemChange?: UseComboboxProps<TItem>["onSelectedItemChange"];
};

export function Autocomplete<TItem extends AutocompleteItem>({
  items,
  renderLabel,
  renderInput,
  renderItem,
  ...props
}: AutocompleteProps<TItem>) {
  const {
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    selectedItem,
    isOpen,
    setInputValue,
    selectItem,
  } = useCombobox({
    ...props,
    items,
    itemToString(item) {
      return item ? item.label : "";
    },
    // TODO: Maybe this callback is not needed
    onIsOpenChange({ isOpen, selectedItem, inputValue }) {
      if (!isOpen && selectedItem && !inputValue) {
        setInputValue(selectedItem.label);
      }
    },
  });

  return (
    <div>
      <div className="flex w-72 flex-col gap-1">
        {renderLabel({
          ...getLabelProps(),
          className: "w-fit",
        })}

        <div className="flex gap-0.5 border border-neutral-400 bg-white">
          {renderInput({
            ...getInputProps(),
            className:
              "w-full px-3 py-2 outline-none focus-visible:ring focus-visible:ring-blue-600",
          })}

          <button
            type="button"
            tabIndex={-1}
            className="px-2"
            aria-label="clear selection"
            onClick={() => selectItem(null)}
          >
            &#215;
          </button>

          <button
            type="button"
            className="px-2"
            aria-label="toggle menu"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>

      <ul
        className={cn("absolute z-10 mt-1 max-h-80 w-72 overflow-y-scroll bg-white p-0 shadow-md", {
          hidden: !(isOpen && items.length),
        })}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={item.id}
              className={cn("flex cursor-pointer flex-col px-3 py-2 shadow-sm", {
                "bg-blue-300": index === highlightedIndex,
                "font-bold": selectedItem?.id === item.id,
              })}
              {...getItemProps({ item, index })}
            >
              {renderItem(item)}
            </li>
          ))}
      </ul>
    </div>
  );
}
