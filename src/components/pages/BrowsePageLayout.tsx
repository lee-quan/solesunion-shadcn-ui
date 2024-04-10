"use client";

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FilterIcon, ArrowUpDownIcon } from "@/components/icons";
import { cn, decrypt, encrypt } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_BRANDS_AND_SIZES_FOR_BROWSE_PAGE } from "@/lib/graphql/queries/productQueries";
import { useState } from "react";

export default function BrowsePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productCategories = [
    {
      name: "Sneakers",
      href: "/sneakers",
    },
    {
      name: "Apparels",
      href: "/apparels",
    },
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q")
    ? JSON.parse(decrypt(searchParams.get("q")))
    : { sizes: [], brands: [] };

  const { data, refetch } = useQuery(GET_BRANDS_AND_SIZES_FOR_BROWSE_PAGE, {
    variables: { category: pathname.split("/").pop() },
  });

  function handleBrandChange(brand: string) {
    return encrypt(
      JSON.stringify({
        ...qParam,
        brands: qParam.brands.includes(brand)
          ? qParam.brands.filter((b: string) => b !== brand)
          : [...qParam.brands, brand],
      })
    );
  }

  function handleSizeChange(size: string) {
    return encrypt(
      JSON.stringify({
        ...qParam,
        sizes: qParam.sizes.includes(size)
          ? qParam.sizes.filter((s: string) => s !== size)
          : [...qParam.sizes, size],
      })
    );
  }
  return (
    <main className="container mx-auto px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start">
      <div className="flex flex-col gap-4 items-start py-2 border p-3 border-gray-50 rounded-sm">
        <div className="flex items-center justify-between space-x-2 text-blue-500 w-full">
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-bold uppercase">Filters</h3>
            <FilterIcon className="h-3 w-3" />
          </div>
          <Link href="/browse">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path>
            </svg>
          </Link>
        </div>
        <Accordion
          className="w-full"
          type="multiple"
          defaultValue={["category", "brand", "size"]}
        >
          <AccordionItem value="category">
            <AccordionTrigger className="text-xs font-bold uppercase">
              Product Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1">
                {productCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={
                      pathname === category.href ? "/browse" : category.href
                    }
                    className={cn(
                      "p-1 px-2 border text-xs uppercase rounded-sm",
                      pathname === category.href &&
                        "border-blue-500 text-blue-500"
                    )}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand">
            <AccordionTrigger className="text-xs font-bold uppercase">
              Brands
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1">
                {data?.brandAndSize.brands.split(",").map((brand: string) => (
                  <Link
                    key={brand}
                    href={`${pathname}?q=${handleBrandChange(brand)}`}
                    className={cn(
                      "p-1 px-2 border text-xs uppercase rounded-sm",
                      qParam.brands.includes(brand) &&
                        "border-blue-500 text-blue-500"
                    )}
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger className="text-xs font-bold uppercase">
              Sizes
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-1">
                {data?.brandAndSize.sizes.split(",").map((size: string) => (
                  <Link
                    key={size}
                    href={`${pathname}?q=${handleSizeChange(size)}`}
                    className={cn(
                      "p-1 px-2 border text-xs uppercase rounded-sm",
                      qParam.sizes.includes(size) &&
                        "border-blue-500 text-blue-500"
                    )}
                  >
                    {size}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="grid gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto shrink-0" variant="outline">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value="newest">
                <DropdownMenuRadioItem value="newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="high">
                  Price: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </main>
  );
}
