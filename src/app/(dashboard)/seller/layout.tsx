"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  HistoryIcon,
  PackageIcon,
  SneakerIcon,
  TrashIcon,
  TruckIcon,
} from "@/components/icons";
import { cn, encrypt } from "@/lib/utils";
import useQParam from "@/hooks/useQParams";
import { ChevronDownIcon, PinLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const SellerDashboardLinks = [
    {
      label: "Active Listings",
      icon: SneakerIcon,
      status: "active",
      href: `/seller/offer?q=${encrypt({ status: "active" })}`,
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
      href: `/seller/offer?q=${encrypt({ status: "sold" })}`,
      description:
        "This tab will display all completed transactions, including sneakers that have been sold and shipped to the buyer. It serves as a historical record for the seller.",
    },
    {
      label: "Deleted Listings",
      icon: TrashIcon,
      status: "deleted",
      href: `/seller/offer?q=${encrypt({ status: "deleted" })}`,
      description: "This tab will display all deleted listings.",
    },
    {
      label: "Back to Profile Page",
      icon: TrashIcon,
      status: "profile",
      href: "/profile",
      description: "This tab will redirect you to your profile page.",
    },
  ];

  const qParams = useQParam();
  const [open, setOpen] = useState(false);
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="min-h-screen max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <SneakerIcon className="h-6 w-6" />
              <span className="">Soles Union</span>
            </Link>
          </div>
          <div className="h-full flex-1 py-2 justify-between">
            <nav className="grid items-start px-4 text-sm font-medium">
              {SellerDashboardLinks.map((link) => (
                <Link
                  key={link.label}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                    qParams.status === link.status
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500"
                  )}
                  href={link.href}
                >
                  {link.status === "profile" ? (
                    <></>
                  ) : (
                    <link.icon className="h-4 w-4" />
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[56px_auto_1fr]">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
          <div className="w-full flex-1 hidden lg:block">
            <h1 className="font-semibold text-lg">
              {
                SellerDashboardLinks.find(
                  (link) => qParams.status === link.status
                )?.label
              }
            </h1>
          </div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="lg:hidden">
                <h1 className="font-semibold text-lg">
                  {
                    SellerDashboardLinks.find(
                      (link) => qParams.status === link.status
                    )?.label
                  }
                </h1>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SellerDashboardLinks.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full",
                    qParams.status === link.status
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500"
                  )}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 w-full"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="h-auto p-6">
          <p>
            {
              SellerDashboardLinks.find(
                (link) => qParams.status === link.status
              )?.description
            }
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
