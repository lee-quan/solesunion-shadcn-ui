"use client";

import { FormField } from "@/components/form-field";
import { ArrowLeftIcon, LoaderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    GET_ORDER_DETAILS,
    GET_ORDER_HISTORY,
} from "@/lib/graphql/queries/profileQueries";
import { prettyDate, price2d } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { memo, useEffect, useState } from "react";

export default function ProfileOrderInformationPage() {
    const { orderRef } = useParams();
    const { data, loading, error } = useQuery(GET_ORDER_DETAILS, {
        variables: {
            orderRef,
        },
    });

    return (
        <>
            <div className="flex items-center gap-4">
                <Button size="icon" variant="outline">
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="font-semibold text-lg md:text-xl">
                    Order #{orderRef}
                    <span className="font-normal text-gray-500 dark:text-gray-400 ml-2 ">
                        {!!data &&
                            ` on ${prettyDate(
                                data?.userOrderDetail.created_at
                            )}`}
                    </span>
                </h1>
            </div>
            {loading ? (
                <SkeletonOrderDetails />
            ) : (
                <OrderDetails order={data?.userOrderDetail} />
            )}
        </>
    );
}

function SkeletonOrderDetails() {
    return (
        <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                <Card className="h-80 bg-gray-100 animate-pulse shadow-none border-none"></Card>
            </div>
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
                <Card className="h-40 bg-gray-100 animate-pulse shadow-none border-none"></Card>
                <Card className="h-40 bg-gray-100 animate-pulse shadow-none border-none"></Card>
                <Card className="h-40 bg-gray-100 animate-pulse shadow-none border-none"></Card>
            </div>
        </div>
    );
}

function OrderDetails({
    order,
}: {
    order: {
        order_total: number;
        address: string;
        created_at: string;
        order_details: {
            product: {
                product_title: string;
                slug: string;
            };
            quantity: number;
            unit_price: number;
            total_price: number;
            size: string;
            price: number;
        }[];
    };
}) {
    return (
        <div className="flex flex-col md:grid md:grid-cols-6 gap-6">
            <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6">
                <OrderItemsListCard orderDetails={order.order_details} />
            </div>
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col gap-6">
                <ShippingDetailsCard address={order.address} />
                <OrderSummaryCard order={order} />
                <OrderStatusCard order={order} />
            </div>
        </div>
    );
}

function OrderItemsListCard({
    orderDetails,
}: {
    orderDetails: {
        product: {
            product_title: string;
            slug: string;
        };
        quantity: number;
        unit_price: number;
        total_price: number;
        size: string;
        price: number;
    }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px] hidden md:table-cell">
                                Image
                            </TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderDetails.map(
                            (
                                orderDetail: {
                                    product: {
                                        product_title: string;
                                        slug: string;
                                    };
                                    quantity: number;
                                    unit_price: number;
                                    total_price: number;
                                    size: string;
                                    price: number;
                                },
                                index: number
                            ) => (
                                <React.Fragment key={index}>
                                    <TableRow className="border-none">
                                        <TableCell
                                            className="font-medium"
                                            colSpan={4}
                                        >
                                            {orderDetail.size}
                                            {" / "}
                                            <Link
                                                href={`/${orderDetail.product.slug}`}
                                                className="underline"
                                            >
                                                {
                                                    orderDetail.product
                                                        .product_title
                                                }
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="hidden md:table-cell">
                                            <img
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src="/placeholder.svg"
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {orderDetail.quantity}
                                        </TableCell>
                                        <TableCell>
                                            RM {price2d(orderDetail.price)}
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            )
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function ShippingDetailsCard({ address }: { address: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">{address}</CardContent>
        </Card>
    );
}

function OrderSummaryCard({ order }: { order: { order_total: number } }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center">
                    <div>Subtotal</div>
                    <div className="ml-auto">
                        RM {price2d(order.order_total / 1.03)}
                    </div>
                </div>
                <div className="flex items-center">
                    <div>Processing</div>
                    <div className="ml-auto">
                        RM {price2d((order.order_total / 1.03) * 0.03)}
                    </div>
                </div>
                <Separator />
                <div className="flex items-center font-medium">
                    <div>Total</div>
                    <div className="ml-auto">
                        RM {price2d(order.order_total)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function OrderStatusCard({ order }: { order: { created_at: string } }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="grid gap-1">
                    <div>Order Placed</div>
                    <div className="text-gray-500 dark:text-gray-400">
                        {prettyDate(order.created_at)}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
                <Button size="sm">Track Order</Button>
                <Button size="sm" variant="outline">
                    Contact Support
                </Button>
            </CardFooter>
        </Card>
    );
}
