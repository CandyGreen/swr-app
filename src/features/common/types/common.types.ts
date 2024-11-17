import { Currency } from "../constants/common.constants";

export type BffSuccessResponse<TData> = {
  data: TData;
  metadata: Record<string, unknown>;
};

export type BffFailureResponse = {
  error: {
    message: string;
  };
  metadata: Record<string, unknown>;
};

export type Money = {
  value: number;
  currency: Currency;
};

export type Price = {
  base: Money;
  selling: Money;
};
