"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DoubleArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowUpDownIcon, LoaderIcon } from "@/components/icons";
import { cn, encrypt, price2d } from "@/lib/utils";
import { CLOUDFLARE_URL } from "@/lib/constants";
import { FragmentType, graphql, useFragment } from "@/gql";
import Link from "next/link";
import { Product } from "@/gql/graphql";

interface DataTableProps<TData, TValue> {
  data: any;
  loading: boolean;
}

const SELLER_DASHBOARD__PRODUCT_FRAGMENT = graphql(`
  fragment SellerDashboard_ProductFragment on Product {
    id
    product_title
    product_sku
    slug
    image {
      image_file
    }
  }
`);

const productColumns: ColumnDef<Product>[] = [
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
      // console.log(product);
      return (
        <div className="flex items-center">
          <img
            src={`${CLOUDFLARE_URL}/${product?.image?.image_file}/thumbnail`}
            alt={product?.product_title}
            className="w-10 h-10 object-cover rounded-lg"
          />
          <div className="ml-2">
            <Link href={`/dashboard/product/${product?.slug}`} className="text-sm font-semibold">
              {product?.product_title}
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
];

console.log(typeof SELLER_DASHBOARD__PRODUCT_FRAGMENT);

export default function Dataable<TData, TValue>({
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const productData = useFragment(SELLER_DASHBOARD__PRODUCT_FRAGMENT, data);

  const table = useReactTable({
    debugTable: false,
    defaultColumn: {
      meta: {
        editable: false,
      },
      enableResizing: false,
    },
    data,
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  const visibleColumns = table.getVisibleLeafColumns();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
  });
  const virtualColumns = columnVirtualizer.getVirtualItems();

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <div
        ref={tableContainerRef}
        style={{
          overflow: "auto", //our scrollable table container
          position: "relative", //needed for sticky header
        }}
      >
        <Table className="!w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(meta?.className ?? "")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanFilter() && (
                        <Input
                          placeholder={
                            typeof header.column.columnDef.header === "string"
                              ? header.column.columnDef.header
                              : "Min Price"
                          }
                          value={
                            (table
                              .getColumn(header.column.id)
                              ?.getFilterValue() as string) ?? ""
                          }
                          onChange={(event) => {
                            return table
                              .getColumn(header.column.id)
                              ?.setFilterValue(event.target.value);
                          }}
                          className="max-w-sm"
                        />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={productColumns.length}
                  className="h-24 flex justify-center w-full items-center"
                >
                  <LoaderIcon className="animate-spin" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const product: any = row.original;
                    return (
                      <Fragment key={row.id}>
                        <TableRow
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => {
                            const meta = cell.column.columnDef.meta;
                            return (
                              <TableCell
                                key={cell.id}
                                className={cn(meta?.className ?? "")}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      </Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={productColumns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground px-2">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
