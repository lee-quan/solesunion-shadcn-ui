import React from "react";

import { decrypt } from "@/lib/utils";
import { GET_ORDER_SUMMARY } from "@/lib/graphql/queries/orderQueries";
import { makeClient } from "@/lib/graphql/client";
import CheckoutPage from "@/components/pages/CheckoutPage";
import { getServerSession } from "next-auth/next";

export default async function OrderSummary({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const session = await getServerSession();
  const qParams = JSON.parse(decrypt(searchParams.q));

  const client = makeClient(session);

  const { data } = await client.query({
    query: GET_ORDER_SUMMARY,
    variables: {
      cartId: qParams?.cartId || 0,
      cartItem: qParams?.cartItem || { offer_id: 0, quantity: 0 },
    },
  });

  return (
    <>
      <CheckoutPage data={data} />
    </>
  );
}
