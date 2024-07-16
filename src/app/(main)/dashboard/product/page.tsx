"use client";

import { useQuery } from "@apollo/client";
import DataTable from "./_DataTable";
import { graphql } from "@/gql";

const SELLER_DASHBOARD__PRODUCTS = graphql(`
  query SellerDashboard_ProductsQuery {
    SellerDashboard_Products {
      ...SellerDashboard_ProductFragment
    }
  }
`);

export default function _SellerDashboard_ProductsPage() {
  const { data, loading } = useQuery(SELLER_DASHBOARD__PRODUCTS);
  if (!data) return null;
  const productData = data.SellerDashboard_Products || [];
  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      <DataTable data={productData} loading={loading} />
    </div>
  );
}
