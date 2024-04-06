"use client";

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
  return (
    <>
      <NavigationBar />
      {children}
      {!isCheckoutPage && <Footer />}
    </>
  );
}
