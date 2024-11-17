import { CartContainer } from "@/features/cart/components/cart-container.component";
import { Layout } from "@/features/common/components/layout.component";
import { useAppLocale } from "@/features/common/hooks/use-app-locale.hook";
import { formatPrice } from "@/features/common/utils/format-price.util";

export default function ShoppingCartPage() {
  const locale = useAppLocale();

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
                    <p>Price: {formatPrice(lineItem.price.total.selling, locale)}</p>
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
