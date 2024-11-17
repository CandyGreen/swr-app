import { ReactNode } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

type SWRConfigProviderProps = {
  children: ReactNode;
};

const CONFIG: SWRConfiguration = {
  dedupingInterval: 500,
  revalidateOnFocus: false,
  revalidateIfStale: false,
  shouldRetryOnError: false,
  refreshWhenHidden: false,
};

export function SWRConfigProvider({ children }: SWRConfigProviderProps) {
  return <SWRConfig value={CONFIG}>{children}</SWRConfig>;
}
