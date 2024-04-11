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
import { GET_LOWEST_ACTIVE_OFFER_AND_LAST_SALE } from "@/lib/graphql/queries/productQueries";
import { decrypt, encrypt, prettyDate, price2d } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SellPage() {
  const searchParams = useSearchParams();
  const sizeInfo = JSON.parse(decrypt(searchParams.get("q")) || "{}");
  const [price, setPrice] = useState(0);
  const [listType, setListType] = useState("Online");

  const { data } = useQuery(GET_LOWEST_ACTIVE_OFFER_AND_LAST_SALE, {
    variables: {
      product_size_id: sizeInfo.id,
    },
  });

  return (
    <div className="h-full flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">MAKE A LIST</div>
        <div className="text-sm text-gray-500">{sizeInfo.size}</div>
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
      {price < data?.lowestActiveOfferAndLastSale.lowest_offer && (
        <div className="text-sm text-gray-500">
          You are about to be the Lowest List.
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
                List your sneakers online and keep them until they're sold. Once
                sold, ship them to us for authentication. After verification,
                we'll ship them to the buyer.
              </p>
              <p>
                <strong>Consignment:</strong>
              </p>
              <p>
                Ship your sneakers to us right away. We'll authenticate and
                store them. When they sell, we ship directly to the buyer,
                streamlining the process for you.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <RadioGroup
          defaultValue="online"
          value={listType}
          onValueChange={(value) => {
            setListType(value);
          }}
        >
          <div className="flex flex-col space-y-2">
            <Label className="flex items-center gap-2">
              <RadioGroupItem value="Online" />
              Online Listing
            </Label>
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
            <div className="text-sm font-bold">LAST SALE</div>
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
          CANCEL
        </Button>
        <Button className="flex-1" asChild>
          <Link
            href={
              price > 0
                ? `list/review?q=${encrypt(
                    JSON.stringify({
                      ...sizeInfo,
                      price,
                      listType,
                    })
                  )}`
                : {}
            }
          >
            REVIEW LIST
          </Link>
        </Button>
      </div>
    </div>
  );
}
