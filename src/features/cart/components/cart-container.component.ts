import { useEffect, useRef, useState } from "react";

import { UseCartQueryConfig, UseCartQueryData, useCartQuery } from "../hooks/use-cart-query.hook";

type CartContainerChildrenProps = {
  cart: UseCartQueryData | undefined;
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
  isFetchingAfterMount: boolean;
  isFetchedAfterMount: boolean;
  revalidate: () => Promise<UseCartQueryData | undefined>;
};

type CartContainerProps = UseCartQueryConfig & {
  children: (props: CartContainerChildrenProps) => JSX.Element;
};

export function CartContainer({ children, ...config }: CartContainerProps) {
  const { data, error, isLoading, isValidating, mutate: revalidate } = useCartQuery(null, config);

  const [fetchCount, setFetchCount] = useState(0);

  const prevIsValidatingRef = useRef(isValidating);

  useEffect(() => {
    // `isValidating` was true, but now it's false
    if (prevIsValidatingRef.current && !isValidating) {
      setFetchCount((c) => c + 1);
    }

    return () => {
      prevIsValidatingRef.current = isValidating;
    };
  }, [isValidating]);

  return children({
    cart: data,
    isError: !!error,
    isLoading,
    isValidating,
    isFetchingAfterMount: fetchCount === 0 && isValidating,
    isFetchedAfterMount: fetchCount === 1 && !!data,
    revalidate,
  });
}
