"use client";

import BrowsePageLayout from "@/components/pages/BrowsePageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BrowsePageLayout>{children}</BrowsePageLayout>;
}
