"use client";

import { SELLER_DASHBOARD__PENDING_PRODUCT_OFFER } from "@/lib/graphql/queries/offerQueries";
import { useQuery } from "@apollo/client";

import { useState } from "react";
import DataTable from "./_DataTable";
import {
  Offer,
  seller_PendingOfferColumn,
  admin_PendingOfferColumn,
} from "./_Columns";
import { useUserRole } from "@/hooks/useUser";

export default function _SellerDashboard_PendingOfferPage() {
  const userRole = useUserRole();
  const isAdmin = userRole === "A";

  const { data, loading, refetch: fetchPendingProductOffer } = useQuery(SELLER_DASHBOARD__PENDING_PRODUCT_OFFER, {
    variables: { status: "pending" },
  });

  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      {data && <DataTable
        columns={isAdmin ? admin_PendingOfferColumn : seller_PendingOfferColumn}
        data={data?.SellerDashboard_PendingProductOffer}
        loading={loading}
        onFetchData={fetchPendingProductOffer}
      />}
    </div>
  );
}
