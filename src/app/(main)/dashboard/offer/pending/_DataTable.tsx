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
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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
import { LoaderIcon } from "@/components/icons";
import { cn, encrypt, price2d } from "@/lib/utils";
import { CLOUDFLARE_URL } from "@/lib/constants";
import { useUserRole } from "@/hooks/useUser";
import { Offer } from "./_Columns";
import useMutation from "@/hooks/useMutation";
import { SELLER_DASHBOARD__PUBLISH_PENDING_PRODUCT_OFFER } from "@/lib/graphql/mutations/productOfferMutations";
import {
  SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER,
  SELLER_DASHBOARD__PENDING_PRODUCT_OFFER,
} from "@/lib/graphql/queries/offerQueries";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  onFetchData: () => void;
}

export default function Dataable<TData, TValue>({
  columns,
  data,
  loading,
  onFetchData,
}: DataTableProps<TData, TValue>) {
  const userRole = useUserRole();
  const isAdmin = userRole === "A";
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pendingOfferData, setPendingOfferData] = useState<Offer[]>([]);
  const table = useReactTable({
    defaultColumn: {
      meta: {
        editable: false,
      },
      enableResizing: false,
    },
    data,
    columns,
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

  const selectedOfferIds = table
    .getSelectedRowModel()
    .rows.map(({ original }) => (original as Offer).id);
  const [_selectedOfferIds, _setSelectedOfferIds] = useState(selectedOfferIds);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [publishProductOffer, { loading: isPublishingProductOffer }] =
    useMutation(SELLER_DASHBOARD__PUBLISH_PENDING_PRODUCT_OFFER, {
      update: (cache, { SellerDashboard_PublishPendingProductOffer }) => {
        console.log(SellerDashboard_PublishPendingProductOffer);
        const activeOfferData = cache.readQuery({
          query: SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER,
          variables: { status: "active" },
        });
        if (activeOfferData) {
          cache.writeQuery({
            query: SELLER_DASHBOARD__DIRECT_LISTING_PRODUCT_OFFER,
            variables: { status: "active" },
            data: {
              ...activeOfferData,
              SellerDashboard_DirectListingProductOffer: [
                ...SellerDashboard_PublishPendingProductOffer.product_offers,
                ...activeOfferData.SellerDashboard_DirectListingProductOffer,
              ],
            },
          });
        }
      },
      refetchQueries: [
        {
          query: SELLER_DASHBOARD__PENDING_PRODUCT_OFFER,
          variables: { status: "pending" },
        },
      ],
    });

  const handlePublish = useCallback(
    (offer_ids: number[]) => {
      _setSelectedOfferIds(offer_ids);
      publishProductOffer({
        variables: {
          offer_ids,
        },
      });
    },
    [publishProductOffer]
  );

  return (
    <div className="rounded-md overflow-x-auto space-y-2">
      <div>
        {selectedOfferIds.length > 0 && (
          <Button
            onClick={async () => {
              await handlePublish(selectedOfferIds);
              table.toggleAllRowsSelected(false);
            }}
          >
            Publish {selectedOfferIds.length} offer
            {selectedOfferIds.length > 1 && "s"}
          </Button>
        )}
      </div>
      <div
        ref={tableContainerRef}
        className="border"
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
                {isAdmin && <TableHead>Action</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 flex justify-center w-full items-center"
                >
                  <LoaderIcon className="animate-spin" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const offer: any = row.original;
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
                          {isAdmin && (
                            <TableCell>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  handlePublish([offer.id]);
                                }}
                                disabled={isPublishingProductOffer}
                                isSubmitting={isPublishingProductOffer}
                                className="text-black w-[75.59px]"
                              >
                                Publish
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      </Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
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
