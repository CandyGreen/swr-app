import Head from "next/head";

import { Layout } from "@/features/common/components/layout.component";
import { LocationSearchAutocomplete } from "@/features/common/components/location-search.component";
import { LocationSearchContainer } from "@/features/common/containers/location-search.container";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>App | Home</title>
      </Head>

      <h1 className="mb-2 text-2xl font-bold">Home</h1>

      <div className="space-y-3">
        <LocationSearchContainer>
          {({ locations, onQueryChange, onLocationSelect }) => (
            <LocationSearchAutocomplete
              locations={locations}
              onInputValueChange={({ inputValue }) => {
                onQueryChange(inputValue);
              }}
              onSelectedItemChange={({ selectedItem }) => {
                onLocationSelect(selectedItem);
              }}
            />
          )}
        </LocationSearchContainer>

        <button
          type="button"
          className="rounded-sm bg-black px-5 py-3 text-white outline-none focus-visible:ring focus-visible:ring-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

HomePage.Layout = Layout;
