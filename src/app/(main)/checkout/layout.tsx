"use client";

import { CheckoutProvider } from "@/lib/context/CheckoutContext";
import { useSession } from "next-auth/react";

export default function Layout({
  children,
  contactInformation,
  contactInformationGuest,
  orderProcessingInformation,
}: {
  children: React.ReactNode;
  contactInformation: React.ReactNode;
  contactInformationGuest: React.ReactNode;
  orderProcessingInformation: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <CheckoutProvider>
      <div className="w-full mx-auto max-w-6xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 space-y-6 p-4">
          {session ? contactInformation : contactInformationGuest}
          {orderProcessingInformation}
        </div>
        {children}
      </div>
    </CheckoutProvider>
  );
}
