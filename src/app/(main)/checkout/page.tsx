import React from "react";

import { decrypt } from "@/lib/utils";
import { GET_ORDER_SUMMARY } from "@/lib/graphql/queries/orderQueries";
import CheckoutPage from "@/components/pages/CheckoutPage";
import { getClient } from "@/lib/graphql/apollo-client";

export default async function OrderSummary({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const qParams = JSON.parse(decrypt(searchParams.q));
  const client = getClient();

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
