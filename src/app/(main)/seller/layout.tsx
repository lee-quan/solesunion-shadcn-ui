"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  HistoryIcon,
  PackageIcon,
  SneakerIcon,
  TrashIcon,
  TruckIcon,
  UserIcon,
} from "@/components/icons";
import { cn, encrypt } from "@/lib/utils";
import useQParam from "@/hooks/useQParams";
import { ChevronDownIcon, PinLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { usePathname } from "next/navigation";

const sellerDashboardNavigationLinks = [
  {
    label: "Active Listings",
    icon: SneakerIcon,
    status: "active",
    href: `/seller/offer/active`,
    description:
      "This tab will show all sneakers currently listed by the seller that are either available online or have been shipped to and are held at Soles Union, GMBB, ready for purchase.",
  },
  // {
  //   label: "Pending Shipment to Store",
  //   icon: TruckIcon,
  //   status: "pending_store_shipment",
  //   href: `/seller/offer?q=${encrypt({ status: "pending_store_shipment" })}`,
  //   description:
  //     "This tab includes listings where the seller has opted to sell the sneakers in-store but has not yet shipped them to Soles Union, GMBB. It's a reminder for sellers to ship their items.",
  // },
  // {
  //   label: "Pending Seller Shipment",
  //   icon: PackageIcon,
  //   status: "pending_seller_shipment",
  //   href: `/seller/offer?q=${encrypt({ status: "pending_seller_shipment" })}`,
  //   description:
  //     "Listings under this tab are those that have been purchased by a buyer but are still with the seller, awaiting shipment to Soles Union, GMBB for verification and onward delivery to the buyer.",
  // },
  {
    label: "Past Listings",
    icon: HistoryIcon,
    status: "sold",
    href: `/seller/offer/sold`,
    description:
      "This tab will display all completed transactions, including sneakers that have been sold and shipped to the buyer. It serves as a historical record for the seller.",
  },
  // {
  //   label: "Deleted Listings",
  //   icon: TrashIcon,
  //   status: "deleted",
  //   href: `/seller/offer?q=${encrypt({ status: "deleted" })}`,
  //   description: "This tab will display all deleted listings.",
  // },
];

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const qParams = useQParam();
  const status = qParams.status ? qParams.status : "active";
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:grid min-h-screen w-full lg:grid-cols-[180px_1fr]">
      <SellerDashboardSidebar pathname={pathname} />
      <SellerDashboardMenu pathname={pathname} status={status} />
      <main className="flex flex-1 flex-col p-4 md:gap-8 md:p-6">
        {children}
      </main>
    </div>
  );
}

function SellerDashboardSidebar({ pathname }: { pathname: string }) {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <span className="">Seller Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <SellerDashboardNavigationItems pathname={pathname} />
          </nav>
        </div>
      </div>
    </div>
  );
}

function SellerDashboardMenu({
  pathname,
  status,
}: {
  pathname: string;
  status: string;
}) {
  return (
    <header className="lg:hidden flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="lg:hidden border border-gray-200" variant="ghost">
            {
              sellerDashboardNavigationLinks.find(
                (link) => link.status === status
              )?.label
            }{" "}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Seller Dashboard</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SellerDashboardNavigationItems pathname={pathname} />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function SellerDashboardNavigationItems({ pathname }: { pathname: string }) {
  return (
    <>
      {sellerDashboardNavigationLinks.map(
        (
          link: {
            label: string;
            href: string;
            icon: any;
          },
          index
        ) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900",
              pathname === link.href
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        )
      )}
      <Link
        className="mt-9 flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-red-500 hover:text-red-900"
        href="/profile"
      >
        <PinLeftIcon className="h-4 w-4" />
        Back to Profile
      </Link>
    </>
  );
}

function SellerNavigationItems({ pathname }: { pathname: string }) {
  return (
    <>
      <Link
        href={"/profile/payout"}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-500 hover:text-gray-900",
          pathname === "/profile/payout"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500"
        )}
        onClick={() => {}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
        Payout Information
      </Link>
      <Link
        href={"/seller"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-500 hover:text-gray-900"
        onClick={() => {}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
        Listings
      </Link>
    </>
  );
}
