"use client";

import { useState } from "react";
import { OrderDetail, soldOfferColumns } from "./_Columns";
import { SELLER_DASHBOARD__SOLD_PRODUCT_OFFER } from "@/lib/graphql/queries/offerQueries";
import { useQuery } from "@apollo/client";
import DataTable from "./_DataTable";

export default function _SellerDashboard_SoldOfferPage() {
  const [data, setData] = useState<OrderDetail[]>([]);
  const { loading } = useQuery(SELLER_DASHBOARD__SOLD_PRODUCT_OFFER, {
    onCompleted(data) {
      setData(data.SellerDashboard_SoldProductOffer);
    },
  });
  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      <DataTable columns={soldOfferColumns} data={data} loading={loading} />
    </div>
  );
}
