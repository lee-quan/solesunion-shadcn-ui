"use client";

import BreadCrumbs from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isCheckoutPage = pathname.includes("checkout");

  const nonBreadcrumbPage =
    pathname === "/" ||
    pathname.includes("checkout") ||
    pathname.includes("profile");
  return (
    <div className="relative">
      <NavigationBar />
      {!nonBreadcrumbPage && <BreadCrumbs />}
      {children}
      {!isCheckoutPage && <Footer />}
    </div>
  );
}
