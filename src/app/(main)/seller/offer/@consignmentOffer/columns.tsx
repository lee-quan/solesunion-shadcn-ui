"use client";

import { ArrowUpDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CLOUDFLARE_URL } from "@/lib/constants";
import { encrypt, price2d } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Product = {
  product_title: string;
  product_sku: string;
  slug: string;
  lowest_price: number;
  image: {
    image_file: string;
  };
  product_sizes: {
    size: string;
    offer: {
      id: number;
      offer_price: number;
      ready_stock: number;
    };
  }[];
};

export const columns: ColumnDef<Product>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableColumnFilter: false,
  //   enableSorting: false,
  //   enableHiding: false,
  //   size: 40,
  // },
  {
    id: "product",
    header: "Product",
    accessorKey: "product_title",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center">
          <img
            src={`${CLOUDFLARE_URL}/${product.image.image_file}/thumbnail`}
            alt={product.product_title}
            className="w-10 h-10 object-cover rounded-lg hidden md:block"
          />
          <div className="ml-2">
            <Link href={`/${product.slug}`} className="text-sm font-semibold">
              {product.product_title}
            </Link>
            {/* <p>({offer.id})</p> */}
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
    size: 500,
  },
  {
    id: "product_sku",
    header: "SKU",
    accessorKey: "product_sku",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("product_sku")}</p>
    ),
    enableColumnFilter: true,
  },
  {
    id: "lowest_offer",
    accessorKey: "lowest_offer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          {/* arrowup, arrowdown, arrowupdown */}
          {{
            asc: " 🔼",
            desc: " 🔽",
          }[column.getIsSorted() as string] ?? (
            <ArrowUpDownIcon className="ml-2 h-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div>RM {row.getValue("lowest_offer")}</div>,
    filterFn: (row, columnId, filterValue) => {
      // Convert values to numbers for comparison
      const rowValue = Number(row.getValue(columnId));
      const filterValueAsNumber = Number(filterValue);
      return rowValue >= filterValueAsNumber;
    },
    enableColumnFilter: true,
    meta: {
      className: "hidden md:table-cell",
    },
    size: 80,
  },
  {
    id: "ready_stock",
    header: "Stock",
    accessorKey: "product_sizes",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-[1px]">
          {row.original.product_sizes.map((size) => (
            <div key={size.size} className="outline outline-1 p-1">
              <p className="text-sm font-semibold">{size.size}</p>
              <p className="text-xs text-gray-500">{size.offer?.ready_stock || 0}</p>
            </div>
          ))}
        </div>
      );
    },
    enableColumnFilter: true,
    size: 50,
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <Button>
       Edit
      </Button>
    ),
  },
];