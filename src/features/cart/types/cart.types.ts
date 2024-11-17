import { Currency } from "@/features/common/constants/common.constants";

type Product = {
  id: number;
  content: {
    name: string;
    description: string;
  };
};

type Money = {
  value: number;
  currency: Currency;
};

type Price = {
  base: Money;
  selling: Money;
};

type LineItem = {
  id: string;
  quantity: number;
  product: Product;
  price: {
    unit: Price;
    total: Price;
  };
};

type Customer = {
  id: string;
};

export type Cart = {
  id: string;
  lineItems: LineItem[];
  price: Money;
  customer?: Customer;
  createdAt: string;
  updatedAt: string;
};
