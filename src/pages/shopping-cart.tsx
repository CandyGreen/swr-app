import { CartContainer } from "@/features/cart/components/cart-container.component";
import { Layout } from "@/features/common/components/layout.component";

export default function ShoppingCartPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Shopping Cart</h1>

      <CartContainer revalidateOnMount>
        {({ cart, isError, isLoading }) => (
          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error...</div>
            ) : !cart ? (
              <div>Empty...</div>
            ) : (
              <ul className="flex flex-col gap-3">
                {cart.data.lineItems.map((lineItem) => (
                  <li key={lineItem.id}>
                    <p>Name: {lineItem.product.content.name}</p>
                    <p>Description: {lineItem.product.content.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CartContainer>
    </div>
  );
}

ShoppingCartPage.Layout = Layout;
