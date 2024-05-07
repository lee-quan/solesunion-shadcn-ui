"use client";

import { InfoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useQParam from "@/hooks/useQParams";
import { GET_LOWEST_ACTIVE_OFFER_AND_LAST_SALE } from "@/lib/graphql/queries/productQueries";
import { decrypt, encrypt, prettyDate, price2d } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SellPage() {
  const searchParams = useSearchParams();
  const qParam = useQParam();

  const [price, setPrice] = useState(qParam.price ?? 0);
  // const [listType, setListType] = useState(qParam.listType ?? "Online");
  const [listType, setListType] = useState("Consignment");

  const { data } = useQuery(GET_LOWEST_ACTIVE_OFFER_AND_LAST_SALE, {
    variables: {
      product_size_id: qParam.id,
    },
  });

  return (
    <div className="h-full flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">MAKE A LIST</div>
        <div className="text-sm text-gray-500">{qParam.size}</div>
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
        Estimated Payout: RM {price2d(price * 0.8)} (80% of the listing price)
      </div>
      {price < data?.lowestActiveOfferAndLastSale.lowest_offer && (
        <div className="text-sm text-yellow-500">
          Note: Your listing price is lower than the current lowest offer.
        </div>
      )}
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="text-lg font-medium flex items-center">
                Listing Type
                <InfoIcon className="w-4 h-4 ml-2" />
              </Label>
            </TooltipTrigger>
            <TooltipContent className="w-36">
              <p>
                <strong>Online Listing:</strong>
              </p>
              <p>
                List your sneakers online and keep them with you until sold.
                Once a buyer purchases, ship the sneakers to us for
                authentication. After verification, we&apos;ll send them to the
                buyer.
              </p>
              <p>
                <strong>Consignment:</strong>
              </p>
              <p>
                Ship your sneakers to us immediately. We will authenticate,
                store, and handle the selling process. When your sneakers sell,
                we&apos;ll ship them directly to the buyer, simplifying the
                process for you.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <RadioGroup
          defaultValue="Online"
          value={listType}
          onValueChange={(value) => {
            setListType(value);
          }}
        >
          <div className="flex flex-col space-y-2">
            <p className="text-gray-500 text-sm italic">
              Currently, only Consignment listings are supported.
            </p>
            {/* <Label className="flex items-center gap-2">
              <RadioGroupItem value="Online" disabled/>
              Online Listing
            </Label> */}
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="Consignment" />
              Consignment
            </Label>
          </div>
        </RadioGroup>
      </div>
      {data?.lowestActiveOfferAndLastSale.last_sale && (
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <div className="text-sm font-bold">LAST SALE DETAILS</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs text-gray-500">
              {prettyDate(
                data?.lowestActiveOfferAndLastSale.last_sale.created_at
              )}
            </div>
            <div className="text-xs text-gray-500">
              {data?.lowestActiveOfferAndLastSale.last_sale.size}
            </div>
            <div className="text-xs text-gray-500">
              {price2d(data?.lowestActiveOfferAndLastSale.last_sale.unit_price)}
            </div>
          </div>
        </div>
      )}
      <div className="flex space-x-4">
        <Button className="flex-1" variant="outline">
          CANCEL LISTING
        </Button>
        <Button className="flex-1" asChild>
          <Link
            href={
              price > 0
                ? `list/review?q=${encrypt(
                    JSON.stringify({
                      ...qParam,
                      price,
                      listType,
                    })
                  )}`
                : {}
            }
          >
            REVIEW AND CONFIRM
          </Link>
        </Button>
      </div>
    </div>
  );
}
