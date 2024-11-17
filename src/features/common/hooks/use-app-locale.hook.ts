import { useRouter } from "next/router";

import { AppLocale } from "../constants/common.constants";

export function useAppLocale() {
  const { locale = AppLocale.EN } = useRouter();

  return locale as AppLocale;
}
