"use client";

import { ArrowUpDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CLOUDFLARE_URL } from "@/lib/constants";
import { encrypt, price2d } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Offer = {
  product: {
    product_title: string;
    product_sku: string;
    slug: string;
    images: {
      image_file: string;
    }[];
  };
  id: number;
  offer_price: number;
  prod_size: string;
  product_size_id: number;
  in_store: number;
};

export const columns: ColumnDef<Offer>[] = [
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
    accessorKey: "product.product_title",
    cell: ({ row }) => {
      const offer = row.original;
      return (
        <div className="flex items-center">
          <img
            src={`${CLOUDFLARE_URL}/${offer.product.images[0].image_file}/thumbnail`}
            alt={offer.product.product_title}
            className="w-10 h-10 object-cover rounded-lg hidden md:block"
          />
          <div className="ml-2">
            <Link
              href={`/${offer.product.slug}`}
              className="text-sm font-semibold"
            >
              {offer.product.product_title}
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
    accessorKey: "product.product_sku",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("product_sku")}</p>
    ),
    enableColumnFilter: true,
  },
  {
    id: "offer_price",
    accessorKey: "offer_price",
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
    cell: ({ row }) => <div>RM {row.getValue("offer_price")}</div>,
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
    id: "prod_size",
    header: "Size",
    accessorKey: "prod_size",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("prod_size")}</p>
    ),
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
      <Button asChild>
        <Link
          href={`/${row.original.product.slug}/list?q=${encrypt(
            JSON.stringify({
              id: row.original.product_size_id,
              offer_id: row.original.id,
              size: row.original.prod_size,
              price: row.original.offer_price,
              listType: "Consignment",
            })
          )}`}
        >
          Edit
        </Link>
      </Button>
    ),
  },
];

export const soldOfferColumns: ColumnDef<Offer>[] = [
  {
    id: "product",
    header: "Product",
    accessorKey: "product.product_title",
    cell: ({ row }) => {
      const offer = row.original;
      return (
        <div className="flex items-center">
          <img
            src={`${CLOUDFLARE_URL}/${offer.product.images[0].image_file}/thumbnail`}
            alt={offer.product.product_title}
            className="w-10 h-10 object-cover rounded-lg hidden md:block"
          />
          <div className="ml-2">
            <p className="text-sm font-semibold">
              {offer.product.product_title}
            </p>
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    id: "product_sku",
    header: "SKU",
    accessorKey: "product.product_sku",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("product_sku")}</p>
    ),
    enableColumnFilter: true,
  },
  {
    id: "payout",
    accessorKey: "offer_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payout
          {/* arrowup, arrowdown, arrowupdown */}
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className="">RM {price2d(row.original.offer_price * 0.8)}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      // Convert values to numbers for comparison
      const rowValue = Number(row.getValue(columnId));
      const filterValueAsNumber = Number(filterValue);
      return rowValue * 0.8 >= filterValueAsNumber;
    },
    enableColumnFilter: true,
  },
  {
    id: "prod_size",
    header: "Size",
    accessorKey: "prod_size",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("prod_size")}</p>
    ),
    enableColumnFilter: true,
  },
];
export const deletedOfferColumns: ColumnDef<Offer>[] = [
  {
    id: "product",
    header: "Product",
    accessorKey: "product.product_title",
    cell: ({ row }) => {
      const offer = row.original;
      return (
        <div className="flex items-center">
          <img
            src={`${CLOUDFLARE_URL}/${offer.product.images[0].image_file}/thumbnail`}
            alt={offer.product.product_title}
            className="w-10 h-10 object-cover rounded-lg hidden md:block"
          />
          <div className="ml-2">
            <p className="text-sm font-semibold">
              {offer.product.product_title}
            </p>
          </div>
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    id: "product_sku",
    header: "SKU",
    accessorKey: "product.product_sku",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("product_sku")}</p>
    ),
    enableColumnFilter: true,
  },
  {
    id: "payout",
    accessorKey: "offer_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payout
          {/* arrowup, arrowdown, arrowupdown */}
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className="">RM {price2d(row.original.offer_price * 0.8)}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      // Convert values to numbers for comparison
      const rowValue = Number(row.getValue(columnId));
      const filterValueAsNumber = Number(filterValue);
      return rowValue * 0.8 >= filterValueAsNumber;
    },
    enableColumnFilter: true,
  },
  {
    id: "prod_size",
    header: "Size",
    accessorKey: "prod_size",
    cell: ({ row }) => (
      <p className="text-sm font-semibold">{row.getValue("prod_size")}</p>
    ),
    enableColumnFilter: true,
  },
];
