"use client";

import { GET_PRODUCT_OFFERS } from "@/lib/graphql/queries/offerQueries";
import { useQuery } from "@apollo/client";

import { useState } from "react";
import { DataTable } from "./data-table";
import {
  Offer,
  columns,
  deletedOfferColumns,
  soldOfferColumns,
} from "./columns";
import useQParam from "@/hooks/useQParams";
export default function SellerDashboardOfferPage() {
  const { status } = useQParam();
  const [data, setData] = useState<Offer[]>([]);

  const { data: queryData, loading } = useQuery(GET_PRODUCT_OFFERS, {
    variables: { status: status ?? "active" },
    onCompleted(data) {
      setData(data.ProductOffer);
    },
  });

  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      <DataTable
        columns={
          status === "active"
            ? columns
            : status === "sold"
            ? soldOfferColumns
            : status === "deleted"
            ? deletedOfferColumns
            : columns
        }
        data={data}
        loading={loading}
      />
    </div>
  );
}
