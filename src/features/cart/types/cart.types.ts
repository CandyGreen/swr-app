import { Money, Price } from "@/features/common/types/common.types";

type Product = {
  id: number;
  content: {
    name: string;
    description: string;
  };
};

export type LineItem = {
  id: string;
  quantity: number;
  product: Product;
  price: {
    unit: Price;
    total: Price;
  };
  isValidated: boolean;
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
