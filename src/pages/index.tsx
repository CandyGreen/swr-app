import Head from "next/head";

import { Layout } from "@/features/common/components/layout.component";

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>App | Home</title>
      </Head>

      <h1 className="mb-2 text-2xl font-bold">Home</h1>
    </div>
  );
}

HomePage.Layout = Layout;
