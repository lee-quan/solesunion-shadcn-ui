"use client";

import {
  SELLER_DASHBOARD__CONSIGNMENT_PRODUCT_OFFER,
  SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER,
} from "@/lib/graphql/queries/offerQueries";
import { useQuery } from "@apollo/client";
import DataTable from "./_DataTable";
import { useUserRole } from "@/hooks/useUser";
import { FragmentType, graphql } from "@/gql";
import { ColumnDef } from "@tanstack/react-table";

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
