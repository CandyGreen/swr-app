import { CartContainer } from "@/features/cart/components/cart-container.component";
import { RefreshCartPricesContainer } from "@/features/cart/components/refresh-cart-prices-container.component";
import { Layout } from "@/features/common/components/layout.component";

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Checkout</h1>

      <CartContainer revalidateOnMount>
        {({
          cart,
          isError,
          isLoading,
          isValidating,
          isFetchingAfterMount,
          isFetchedAfterMount,
          revalidate,
        }) => {
          const isFetching = isLoading || isFetchingAfterMount;

          return (
            <div>
              <div className="mb-3">
                {isFetching ? (
                  <div>Loading...</div>
                ) : isError ? (
                  <div>Error...</div>
                ) : !cart ? (
                  <div>Empty...</div>
                ) : (
                  <RefreshCartPricesContainer cart={isFetchedAfterMount ? cart : undefined}>
                    {() => (
                      <ul className="flex flex-col gap-3">
                        {cart.data.lineItems.map((lineItem) => (
                          <li key={lineItem.id}>
                            <p>Name: {lineItem.product.content.name}</p>
                            <p>Description: {lineItem.product.content.description}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </RefreshCartPricesContainer>
                )}
              </div>

              <button
                type="button"
                className="rounded-sm bg-black px-5 py-3 text-white"
                onClick={() => revalidate()}
              >
                {isValidating ? "Revalidating..." : "Revalidate"}
              </button>
            </div>
          );
        }}
      </CartContainer>
    </div>
  );
}

CheckoutPage.Layout = Layout;
