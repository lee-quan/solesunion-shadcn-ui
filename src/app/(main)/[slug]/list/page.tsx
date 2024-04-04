"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { price2d } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function sellPage() {
  const searchParams = useSearchParams();
  const size = searchParams.get("size");

  const [price, setPrice] = useState(0);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">MAKE A LIST</div>
        <div className="text-sm text-gray-500">
          {size}
          {/* | HOW DOES IT WORK? */}
        </div>
      </div>
      <div className="flex items-center justify-between relative h-16">
        <Button className="bg-gray-100 px-2 h-full text-sm absolute left-0 text-black shadow-none ">
          -
        </Button>
        <Input
          name=""
          type="number"
          autoFocus
          value={price}
          onChange={(e) => {
            let value = e.target.value;

            if (value.startsWith("0") && value.length > 1) {
              // Remove leading zeros by converting to number then back to string unless the value is empty
              value = Number(value).toString();
            }
            e.target.value = value;
            setPrice(Number(value));
          }}
          className="w-full h-full text-center text-3xl"
        />
        <Button className="bg-gray-100 px-2 h-full text-xl absolute right-0 text-black shadow-none ">
          +
        </Button>
      </div>
      <div className="text-sm text-gray-500">
        Estimated Payout: RM {price2d(price * 0.8)}
      </div>
      <div className="text-sm text-gray-500">
        You are about to be the Lowest List.
      </div>
      <div className="flex space-x-2">
        <Button className="flex-1">SELL NOW MATCH HIGHEST OFFER</Button>
        <Button className="flex-1" variant="secondary">
          MAKE A LIST MATCH LOWEST LIST
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button className="flex-1" variant="outline">
          7 DAYS
        </Button>
        <Button className="flex-1" variant="outline">
          14 DAYS
        </Button>
        <Button className="flex-1" variant="outline">
          30 DAYS
        </Button>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <div className="text-sm font-bold">PRICE HISTORY</div>
          <div className="text-sm font-bold">LAST SALES</div>
        </div>
        <div className="flex justify-between">
          <div className="text-xs text-gray-500">04 Dec '23</div>
          <div className="text-xs text-gray-500">US $1.15M</div>
          <div className="text-xs text-gray-500">RM2,447</div>
        </div>
        <div className="text-xs text-gray-500">
          Last sale price includes global data from other sources
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline">CANCEL</Button>
        <Button>REVIEW LIST</Button>
      </div>
    </div>
  );
}
