"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCheckout } from "@/lib/context/CheckoutContext";
import { useSearchParams } from "next/navigation";
import { cn, decrypt, price2d } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { GET_ORDER_SUMMARY } from "@/lib/graphql/queries/orderQueries";
import { Separator } from "@/components/ui/separator";
import { ChevronUpIcon } from "@/components/icons";
import { Form, Formik } from "formik";
import { FormField } from "@/components/form-field";
import useMutation from "@/hooks/useMutation";
import { APPLY_PROMO_CODE } from "@/lib/graphql/mutations/promoCodeMutation";
import { CLOUDFLARE_URL } from "@/lib/constants";

export default function CheckoutPage({
  data,
}: {
  data: {
    orderSummary: {
      cart_details: {
        offer_id: number;
        quantity: number;
        offer: {
          prod_size: string;
          offer_price: number;
          ready_stock: boolean;
          product: {
            id: number;
            product_title: string;
            product_sku: string;
            category_id: number;
            slug: string;
            image: {
              image_file: string;
            };
          };
        };
      }[];
      total_exclude_processing_fee: number;
    };
  };
}) {
  const { promoCode, paymentMethod } = useCheckout();

  return (
    <>
      <div className="md:block md:w-1/2 md:sticky md:top-[80px] md:self-start">
        <div className="p-4 space-y-5">
          <div className="space-y-2">
            <h2 className="text-xs font-bold">ORDER SUMMARY</h2>
            <Separator />
            <OrderSummarySection
              cart_details={data?.orderSummary?.cart_details}
            />
            <Separator />
          </div>
          <div className="space-y-2">
            <PromoCodeSection />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm">Subtotal</p>
              <p className="text-sm">
                RM {price2d(data?.orderSummary?.total_exclude_processing_fee)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Processing Fee</p>
              <p className="text-sm">
                RM{" "}
                {price2d(
                  data?.orderSummary?.total_exclude_processing_fee * 0.03
                )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">Delivery</p>
              <p className="text-sm">FREE</p>
            </div>
            {promoCode?.discount > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm">Discount</p>
                <p className="text-sm">- RM {price2d(promoCode.discount)}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Total</p>
              <div>
                <p
                  className={cn(
                    "text-sm font-bold",
                    promoCode?.discount > 0 ? "line-through text-gray-500" : ""
                  )}
                >
                  RM{" "}
                  {price2d(
                    data?.orderSummary?.total_exclude_processing_fee * 1.03
                  )}
                </p>
                <p
                  className={cn(
                    "text-sm font-bold",
                    promoCode?.discount > 0 ? "block" : "hidden"
                  )}
                >
                  RM{" "}
                  {price2d(
                    data?.orderSummary?.total_exclude_processing_fee * 1.03 -
                      promoCode.discount
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Button className="w-full uppercase text-xs font-bold">
            {paymentMethod
              ? `PAY RM ${price2d(
                  data?.orderSummary?.total_exclude_processing_fee * 1.03 -
                    promoCode.discount
                )} WITH ${paymentMethod}`
              : "SELECT PAYMENT METHOD"}
          </Button>
        </div>
      </div>
    </>
  );
}

function OrderSummarySection({
  cart_details,
}: {
  cart_details: {
    offer_id: number;
    quantity: number;
    offer: {
      prod_size: string;
      offer_price: number;
      ready_stock: boolean;
      product: {
        id: number;
        product_title: string;
        product_sku: string;
        category_id: number;
        slug: string;
      };
    };
  }[];
}) {
  return (
    <>
      {cart_details?.map((item: any) => (
        <div className="flex items-center justify-between" key={item.offer.id}>
          <div className="flex-1 flex">
            <img
              src={`${CLOUDFLARE_URL}/${item.offer.product.image.image_file}/thumbnail`}
              alt={item.offer.product.product_title}
              className="h-12 w-12 object-contain"
            />
            <div className="text-sm">
              <Link href={`/${item.offer.product.slug}`} className="underline">
                {item.offer.product.product_title}
              </Link>
              <p className="text-xs">{item.offer.product.product_sku}</p>
              <p className="text-xs">Size: {item.offer.prod_size}</p>
              <p className="text-xs">x {item.quantity}</p>
            </div>
          </div>
          <p className="font-semibold">RM {price2d(item.offer.offer_price)}</p>
        </div>
      ))}
    </>
  );
}

function PromoCodeSection() {
  const { promoCode, updatePromoCode } = useCheckout();
  const [applyPromoCode] = useMutation(APPLY_PROMO_CODE);
  if (promoCode.success) {
    return (
      <>
        <div className="flex items-center border p-4 rounded font-bold">
          <p className="text-sm">Promo Code Applied</p>
          <p className="text-sm ml-auto">{promoCode.code}</p>
        </div>
      </>
    );
  }
  return (
    <Formik
      initialValues={{
        promoCode: "",
      }}
      onSubmit={async (values) => {
        const { data } = await applyPromoCode({
          variables: {
            promoCode: values.promoCode,
          },
        });
        if (data.applyPromoCode.success) {
          updatePromoCode(data.applyPromoCode);
        }
      }}
    >
      {({ isSubmitting, errors }) => {
        return (
          <Form>
            <div className="flex items-center">
              <FormField
                containerClassName="gap-0"
                inputClassName="focus-visible:!ring-0 focus-visible:!outline-none focus-visible:border-black rounded-r-none"
                name="promoCode"
                labelClassName="hidden"
                label="Promo Code"
                type="text"
                placeholder="Enter promo code"
              />
              <Button
                type="submit"
                className="rounded-l-none"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                APPLY
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}