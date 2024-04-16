"use client";

import { LoaderIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_ORDER_HISTORY } from "@/lib/graphql/queries/profileQueries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const [paginationData, setPaginationData] = useState<any>(null);

  const [page, setPage] = useState(
    searchParams.get("page")
      ? parseInt(searchParams.get("page") as string, 10)
      : 1
  );

  const { loading, error, data, refetch } = useQuery(GET_ORDER_HISTORY, {
    variables: {
      limit: 10,
      page: page,
    },
    onCompleted: (data) => {
      {
        let temp = data.userOrder;
        setPaginationData(temp);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <>
      <div className="flex gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Order History</h1>
      </div>
      <div className="space-y-2">
        {paginationData && (
          <TablePagination {...paginationData} setPage={setPage} page={page} />
        )}
        {loading && <LoaderIcon />}
        {!loading && !error && data && (
          <OrdersDisplay orders={data?.userOrder.data} />
        )}
      </div>
    </>
  );
}

function OrdersDisplay({
  orders,
}: {
  orders: {
    order_ref: string;
    created_at: string;
    order_total: string;
  }[];
}) {
  return (
    <>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Reference.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_ref}>
                  <TableCell className="font-medium">
                    {order.order_ref}
                  </TableCell>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell>RM {order.order_total}</TableCell>
                  <TableCell>
                    <Link
                      href={`/profile/orders/${order.order_ref}`}
                      className="underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function TablePagination({ setPage, page, last_page }: any) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            tabIndex={page <= 1 ? -1 : undefined}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
        </PaginationItem>
        <PaginationItem className="flex items-center">
          <span className="mx-2 text-xs">
            {page} of {last_page}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            tabIndex={page >= last_page ? -1 : undefined}
            className={
              page >= last_page ? "pointer-events-none opacity-50" : undefined
            }
            onClick={() => {
              if (page < last_page) {
                setPage(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
