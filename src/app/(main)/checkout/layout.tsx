"use client";

import { CheckoutProvider } from "@/lib/context/CheckoutContext";

export default function Layout({
  orderSummary,
  checkoutOptions,
}: {
  orderSummary: React.ReactNode;
  checkoutOptions: React.ReactNode;
}) {
  return (
    <CheckoutProvider>
      <div className="container max-w-6xl flex flex-col md:flex-row">
        {checkoutOptions}
        {orderSummary}
      </div>
    </CheckoutProvider>
  );
}
