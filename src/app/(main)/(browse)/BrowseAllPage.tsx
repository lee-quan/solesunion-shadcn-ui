"use client";

import { ArrowUpDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CLOUDFLARE_URL } from "@/lib/constants";
import { decrypt, encrypt, price } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const OPTIONS = [
  {
    label: "Newest",
    value: "po.created_at desc",
  },
  {
    label: "Price: Low to High",
    value: "lowest_offer asc",
  },
  {
    label: "Price: High to Low",
    value: "lowest_offer desc",
  },
];

export default function BrowseAllPage({ data }: { data: any }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q")
    ? JSON.parse(decrypt(searchParams.get("q")))
    : { sizes: [], brands: [], sortBy: "po.created_at desc" };

  const [sortBy, setSortBy] = useState(qParam.sortBy);
  const [open, setOpen] = useState(false);

  const handleSortChange = (value: string) => {
    return encrypt(
      JSON.stringify({
        ...qParam,
        sortBy: value,
      })
    );
  };

  return (
    <>
      <div className="flex justify-between flex-row items-center md:mb-4 px-2">
        <p className="text-xs text-gray-400 uppercase">
          Browse{" "}
          <span className="text-black font-bold">
            {data?.browseProduct?.total}
          </span>{" "}
          results
        </p>
        <div className="ml-auto flex items-center">
          <span className="text-xs font-bold">SORT</span>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                className="ml-3 shrink-0 font-light rounded-none shadow-none"
                variant="ghostOutlineMd"
              >
                {OPTIONS.find((option) => option.value === sortBy)?.label}
                <ArrowUpDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sortBy}>
                {OPTIONS.map((option) => {
                  const href = `${pathname}?q=${handleSortChange(
                    option.value
                  )}`;
                  return (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setOpen(false);
                      }}
                    >
                      <Link
                        href={`${pathname}?q=${handleSortChange(option.value)}`}
                      >
                        {option.label}
                      </Link>
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px]">
        {data?.browseProduct?.data.map((product: any) => (
          <div
            className="relative group p-2 outline outline-1 outline-gray-100"
            key={product.slug}
          >
            <Link className="absolute inset-0 z-10" href={`/${product.slug}`}>
              <span className="sr-only">View</span>
            </Link>
            <img
              alt={product.product_title}
              className="rounded-lg object-contain w-full aspect-square group-hover:opacity-50 transition-opacity"
              height={200}
              src={`${CLOUDFLARE_URL}/${product.image_file}/public`}
              width={200}
            />
            <div className="flex-1 py-4">
              <h3 className="font-light tracking-tight text-xs uppercase">
                {product.product_title}
              </h3>
              <div className="flex items-center gap-0.5"></div>
              <h4 className="font-semibold text-sm">
                RM {price(product.lowest_offer)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
