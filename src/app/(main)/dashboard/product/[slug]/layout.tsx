"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { graphql } from "@/gql";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SELLER_DASHBOARD__GET_PRODUCT_IS_CONSIGNMENT = graphql(`
  query SELLER_DASHBOARD__GET_PRODUCT_IS_CONSIGNMENT($slug: String!) {
    SellerDashboard_GetProductIsConsignment(slug: $slug)
  }
`);

export default function _SellerDashboard_ProductDetailsPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const link = `/dashboard/product/${slug}`;
  const pathname = usePathname();
  const temp = pathname.split("/").pop();
  const currentPage =
    temp === "stock" ? "stock" : temp === "images" ? "images" : "basicInfo";
  const [currentTab, setCurrentTab] = useState(currentPage);

  const { data } = useQuery(SELLER_DASHBOARD__GET_PRODUCT_IS_CONSIGNMENT, {
    variables: {
      slug,
    },
  });

  const isConsignment = data?.SellerDashboard_GetProductIsConsignment === 1;

  useEffect(() => {
    const temp = pathname.split("/").pop();
    const currentPage =
      temp === "stock" ? "stock" : temp === "images" ? "images" : "basicInfo";
    setCurrentTab(currentPage);
  }, [pathname]);
  return (
    <div className="p-6 pt-0 overflow-x-auto max-w-full">
      <div className="grid grid-cols-1 gap-4">
        <Tabs value={currentTab}>
          <TabsList className={cn("grid w-full", isConsignment ? "grid-cols-3" : "grid-cols-2")}>
            <TabsTrigger value="basicInfo" asChild>
              <Link href={link}>Product Information</Link>
            </TabsTrigger>
            {isConsignment && (
              <TabsTrigger value="stock" asChild disabled>
                <Link href={`${link}/stock`}>Stock</Link>
              </TabsTrigger>
            )}
            <TabsTrigger value="images" asChild>
              <Link href={`${link}/images`}>Image</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </div>
  );
}
