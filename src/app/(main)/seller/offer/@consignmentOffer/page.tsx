"use client";

import { SELLER_DASHBOARD__CONSIGNMENT_PRODUCT_OFFER } from "@/lib/graphql/queries/offerQueries";
import { useQuery } from "@apollo/client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { Product, columns } from "./columns";
import useQParam from "@/hooks/useQParams";

export default function SellerDashboardOfferPage() {
  const { status } = useQParam();
  const [data, setData] = useState<Product[]>([]);

  const { data: queryData, loading } = useQuery(
    SELLER_DASHBOARD__CONSIGNMENT_PRODUCT_OFFER,
    {
      variables: { status: status ?? "active" },
      onCompleted(data) {
        setData(data.SellerDashboard_ConsignmentProductOffer);
      },
    }
  );

  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
