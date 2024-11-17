import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const LINKS = [
  {
    id: "home",
    href: "/",
    label: "Home",
  },
  {
    id: "shopping-cart",
    href: "/shopping-cart",
    label: "Shopping Cart",
  },
  {
    id: "checkout",
    href: "/checkout",
    label: "Checkout",
  },
];

export function Layout({ children }: LayoutProps) {
  const { asPath } = useRouter();

  return (
    <div>
      <header className="bg-black px-5 py-3 text-white">
        <nav>
          <ul className="flex gap-5">
            {LINKS.map((link) => (
              <li key={link.id}>
                <Link href={link.href} className={asPath === link.href ? "underline" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="p-5">{children}</main>
    </div>
  );
}
