"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { useCheckout } from "@/lib/context/CheckoutContext";

export default function OrderSummary() {
  return <RightPanel />;
}

function RightPanel() {
  const { verifyAndApplyPromoCode } = useCheckout();

  return (
    <>
      <div className="hidden md:block md:w-1/2 md:sticky md:top-[80px] md:self-start">
        <div className="p-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">ORDER SUMMARY</h2>
            <div className="flex items-center justify-between">
              <p className="text-sm">
                (Women) Nike Dunk Low SE '85' DO9457-101 DO9457-101
              </p>
              <p className="font-semibold">673.00 MYR</p>
            </div>
            <p className="text-sm">Size: US 5.5W</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  verifyAndApplyPromoCode("abc");
                }}
              >
                CHOOSE ADD-ONS
              </Button>
              <Link className="text-sm" href="#">
                SEE MORE
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline">Apply Promocode</Button>
              <Link className="text-sm" href="#">
                No Promocode Applied
              </Link>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm">Processing Fee</p>
              <p className="text-sm">5.39 MYR</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Delivery</p>
              <p className="text-sm">59.99 MYR</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Total</p>
              <p className="text-sm font-bold">738.38 MYR</p>
            </div>
            <p className="text-sm">Inclusive of SST $67.13</p>
            <div className="flex items-center justify-between">
              <p className="text-sm">Pay By Crypto</p>
              <p className="text-sm">Around 0.002282 BTC</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Users2Icon className="w-12 h-6" />
            <ComputerIcon className="w-12 h-6" />
          </div>
        </div>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden mt-4 bottom-0 sticky" variant="outline">
            Show Order Summary
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full md:hidden" side="bottom">
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">ORDER SUMMARY</h2>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  (Women) Nike Dunk Low SE '85' DO9457-101 DO9457-101
                </p>
                <p className="font-semibold">673.00 MYR</p>
              </div>
              <p className="text-sm">Size: US 5.5W</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Button variant="outline">CHOOSE ADD-ONS</Button>
                <Link className="text-sm" href="#">
                  SEE MORE
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <Button variant="outline">Apply Promocode</Button>
                <Link className="text-sm" href="#">
                  No Promocode Applied
                </Link>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm">Processing Fee</p>
                <p className="text-sm">5.39 MYR</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Delivery</p>
                <p className="text-sm">59.99 MYR</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">Total</p>
                <p className="text-sm font-bold">738.38 MYR</p>
              </div>
              <p className="text-sm">Inclusive of SST $67.13</p>
              <div className="flex items-center justify-between">
                <p className="text-sm">Pay By Crypto</p>
                <p className="text-sm">Around 0.002282 BTC</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Users2Icon className="w-12 h-6" />
              <ComputerIcon className="w-12 h-6" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function ArchiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ComputerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function Users2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 19a6 6 0 0 0-12 0" />
      <circle cx="8" cy="9" r="4" />
      <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
    </svg>
  );
}
