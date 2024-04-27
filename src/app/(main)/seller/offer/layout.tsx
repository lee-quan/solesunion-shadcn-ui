"use client";

import { useUserRole } from "@/hooks/useUser";

export default function Layout({
  children,
  directListingOffer,
  consignmentOffer,
}: {
  children: React.ReactNode;
  directListingOffer: React.ReactNode;
  consignmentOffer: React.ReactNode;
}) {
  const userRole = useUserRole();

  return <div>{userRole === "V" ? consignmentOffer : directListingOffer}</div>;
}
