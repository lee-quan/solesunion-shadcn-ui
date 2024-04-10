"use client";

import BrowsePageLayout from "@/components/pages/BrowsePageLayout";

export default function Layout({
  children,
  apparelsSizeAndBrand,
  sneakersSizeAndBrand,
}: {
  children: React.ReactNode;
  apparelsSizeAndBrand: React.ReactNode;
  sneakersSizeAndBrand: React.ReactNode;
}) {
  return <BrowsePageLayout>{children}</BrowsePageLayout>;
}
