import type { AppProps } from "next/app";
import { Fragment } from "react";

import { SWRConfigProvider } from "@/features/common/providers/swr-config.provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Layout = Component.Layout || Fragment;

  return (
    <SWRConfigProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfigProvider>
  );
}
