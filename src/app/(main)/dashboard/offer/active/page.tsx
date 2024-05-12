"use client";

import {
  SELLER_DASHBOARD__CONSIGNMENT_PRODUCT_OFFER,
  SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER,
} from "@/lib/graphql/queries/offerQueries";
import { useQuery } from "@apollo/client";
import DataTable from "./_DataTable";
import {
  directListing_ActiveOfferColumn,
  consignment_ActiveOfferColumn,
} from "./_Columns";
import { useUserRole } from "@/hooks/useUser";

export default function _SellerDashboard_ActiveOfferPage() {
  const userRole = useUserRole();
  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      {userRole === "V" ? (
        <ConsignmentActiveTable />
      ) : (
        <DirectListingActiveTable />
      )}
    </div>
  );
}

const DirectListingActiveTable = () => {
  const { data, loading } = useQuery(
    SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER,
    {
      variables: { status: "active" },
    }
  );
  if (!data) return null;

  console.log(data);
  return (
    <DataTable
      columns={directListing_ActiveOfferColumn}
      data={data?.SellerDashboard_DirectListingProductOffer}
      loading={loading}
    />
  );
};

const ConsignmentActiveTable = () => {
  const { data, loading } = useQuery(
    SELLER_DASHBOARD__CONSIGNMENT_PRODUCT_OFFER,
    {
      variables: { status: "active" },
    }
  );
  if (!data) return null;

  return (
    <DataTable
      columns={consignment_ActiveOfferColumn}
      data={data?.SellerDashboard_ConsignmentProductOffer}
      loading={loading}
    />
  );
};
