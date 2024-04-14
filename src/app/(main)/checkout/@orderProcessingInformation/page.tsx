"use client";

import { Button } from "@/components/ui/button";
import { useCheckout } from "@/lib/context/CheckoutContext";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import * as Yup from "yup";
import { FormField } from "@/components/form-field";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Form, Formik } from "formik";

interface AddressType {
  id: number;
  name: string;
  address_type: string;
  address_1: string;
  address_2: string;
  pincode: string;
  city: string;
  country: string;
  state: string;
  mobile: string;
}

const paymentMethods: {
  id: "eghl" | "stripe" | "atome";
  name: string;
  description: string;
  logo: string;
  paymentGateway: "eGHL" | "Stripe" | "Atome";
}[] = [
  {
    id: "eghl",
    name: "e-Wallet, Online Banking",
    description: "Fast and secure online payment",
    logo: "/images/logo-eghl.png",
    paymentGateway: "eGHL",
  },
  {
    id: "stripe",
    name: "Credit/Debit Card",
    description: "Safe and reliable payment gateway (Stripe)",
    logo: "/images/logo-stripe.png",
    paymentGateway: "Stripe",
  },
  {
    id: "atome",
    name: "0% interest, Pay later in  3 Installments, due monthly",
    description: "Flexible payment with 0% interest (Atome)",
    logo: "/images/logo-atome.png",
    paymentGateway: "Atome",
  },
];

const initialAddress: AddressType = {
  id: 0,
  name: "",
  address_type: "new",
  address_1: "",
  address_2: "",
  pincode: "",
  city: "",
  country: "",
  state: "",
  mobile: "",
};
export default function OrderProcessingInformation() {
  return (
    <>
      <FullfillmentMethodSection />
      <PaymentMethodSection />
    </>
  );
}

function FullfillmentMethodSection() {
  const { fulfillmentMethod, updateFullfillmentMethod } = useCheckout();
  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold">FULFILLMENT METHOD</h2>
      <RadioGroup
        className="space-y-1"
        value={fulfillmentMethod}
        onValueChange={(value) => {
          updateFullfillmentMethod(value);
        }}
      >
        <Label
          className="flex items-center gap-4 cursor-pointer"
          htmlFor="delivery"
        >
          <RadioGroupItem
            className="peer sr-only"
            id="delivery"
            value="delivery"
          />
          <div className="flex items-center gap-2 rounded p-2 w-full transition-colors peer-aria-checked:border peer-aria-checked:border-gray-900 peer-aria-checked:bg-gray-50">
            <div className="flex-1">
              <span className="font-medium text-sm">Delivery</span>
              <p className="text-xs text-gray-500">
                Enjoy free shipping directly to your doorstep.
              </p>
            </div>
          </div>
        </Label>
        <Label
          className="flex items-center gap-4 cursor-pointer"
          htmlFor="pickup"
        >
          <RadioGroupItem className="peer sr-only" id="pickup" value="pickup" />
          <div className="flex items-center gap-2 rounded p-2 w-full transition-colors peer-aria-checked:border peer-aria-checked:border-gray-900 peer-aria-checked:bg-gray-50">
            <div className="flex-1">
              <span className="font-medium text-sm">Self Pickup</span>
              <p className="text-xs text-gray-500">
                Pick up at our store location: Soles Union, Mano Plus (Mezzanine
                Floor), GMBB.
              </p>
            </div>
          </div>
        </Label>
      </RadioGroup>
    </div>
  );
}

function PaymentMethodSection() {
  const [billingAddress, setBillingAddress] = useState({
    eghl: initialAddress,
    stripe: initialAddress,
    atome: initialAddress,
  });
  const [showBillingAddressForm, setShowBillingAddressForm] = useState<{
    eghl: boolean;
    stripe: boolean;
    atome: boolean;
  }>({
    eghl: false,
    stripe: false,
    atome: false,
  });

  const { paymentMethod, updatePaymentMethod } = useCheckout();

  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold">PAYMENT METHOD</h2>
      <RadioGroup
        className="space-y-1"
        value={paymentMethod}
        onValueChange={(value) => {
          updatePaymentMethod(value);
        }}
      >
        {paymentMethods.map((method) => (
          <Label
            key={method.id}
            className="flex flex-col justify-center gap-4 cursor-pointer"
            htmlFor={method.id}
          >
            <RadioGroupItem
              className="peer sr-only"
              id={method.id}
              value={method.id}
            />
            <div className="flex flex-col gap-5 rounded p-2 w-full transition-colors peer-aria-checked:border peer-aria-checked:border-gray-900 peer-aria-checked:bg-gray-50">
              <RadioGroupItem
                className="peer sr-only"
                id={method.id}
                value={method.id}
              />
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  className="peer"
                  id={method.id}
                  value={method.id}
                />
                <div className="flex-1">
                  <span className="font-bold text-xs uppercase">
                    {method.name}
                  </span>
                  <p className="text-xs text-gray-500">{method.description}</p>
                </div>
                <img
                  alt={`${method.id} Logo`}
                  height="50"
                  src={method.logo}
                  width="50"
                />
              </div>

              <div className="flex-col hidden peer-aria-checked:flex gap-5">
                <p className="text-xs text-gray-500">
                  After clicking "Pay with {method.paymentGateway}", you will be
                  redirected to eGHL to complete the purchase securely.
                </p>
                <div className="flex flex-col items-start space-x-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={!showBillingAddressForm[method.id]}
                      className="peer rounded-none"
                      onCheckedChange={() =>
                        setShowBillingAddressForm({
                          ...showBillingAddressForm,
                          [method.id]: !showBillingAddressForm[method.id],
                        })
                      }
                    />
                    <Label
                      htmlFor="same-billing-address-as-delivery-eghl"
                      className="text-xs font-medium leading-none peer-checked:opacity-50 peer-checked:cursor-not-allowed"
                    >
                      Use delivery address as my billing address
                    </Label>
                  </div>
                  {showBillingAddressForm[method.id] && (
                    <AddressForm
                      address={billingAddress[method.id]}
                      setBillingAddress={setBillingAddress}
                      billingAddress={billingAddress}
                    />
                  )}
                </div>
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}

function AddressForm({
  address,
  setBillingAddress,
  billingAddress,
}: {
  address: AddressType;
  setBillingAddress: any;
  billingAddress: any;
}) {
  const validationSchema = Yup.object().shape({
    id: Yup.number(),
    address_1: Yup.string().required("Required"),
    address_2: Yup.string().nullable(),
    name: Yup.string().required("Required"),
    address_type: Yup.string().required("Required"),
    pincode: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    mobile: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={{
          ...address,
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {}}
      >
        {({ isSubmitting, handleChange, setFieldValue }) => {
          return (
            <Form className="w-full !ml-0">
              <Card className="py-3 border-none bg-transparent shadow-none px-0 w-full">
                <CardContent className="p-0 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <h2 className="text-xl font-bold grid col-span-2">
                      Billing Address
                    </h2>
                    <FormField
                      name="id"
                      label="id"
                      type="hidden"
                      placeholder=""
                      containerClassName="hidden"
                    />
                    <FormField
                      name="address_type"
                      label="address_type"
                      type="text"
                      placeholder=""
                      containerClassName="hidden"
                    />
                    <FormField
                      name="name"
                      label="Name"
                      type="text"
                      placeholder="Enter your name"
                      containerClassName="grid col-span-2"
                      setValue={(e: any) => {
                        setFieldValue("name", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            name: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="address_1"
                      label="Address Line 1"
                      type="text"
                      placeholder="Enter your address"
                      containerClassName="col-span-2"
                      setValue={(e: any) => {
                        setFieldValue("address_1", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            address_1: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="address_2"
                      label="Address Line 2"
                      type="text"
                      placeholder="Enter your address"
                      containerClassName="col-span-2"
                      setValue={(e: any) => {
                        setFieldValue("address_2", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            address_2: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="city"
                      label="City"
                      type="text"
                      placeholder="Enter your city"
                      containerClassName="col-span-2 lg:col-span-1"
                      setValue={(e: any) => {
                        setFieldValue("city", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            city: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="state"
                      label="State"
                      type="text"
                      placeholder="Enter your state"
                      containerClassName="col-span-2 lg:col-span-1"
                      setValue={(e: any) => {
                        setFieldValue("state", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            state: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="pincode"
                      label="Pincode"
                      type="text"
                      placeholder="Enter your pincode"
                      containerClassName="col-span-2 lg:col-span-1"
                      setValue={(e: any) => {
                        setFieldValue("pincode", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            pincode: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="country"
                      label="Country"
                      type="text"
                      placeholder="Enter your country"
                      containerClassName="col-span-2 lg:col-span-1"
                      setValue={(e: any) => {
                        setFieldValue("country", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            country: e,
                          },
                        });
                      }}
                    />
                    <FormField
                      name="mobile"
                      label="Mobile"
                      type="text"
                      placeholder="Enter your mobile number (including country code) eg: +60123456789"
                      containerClassName="col-span-2 lg:col-span-1"
                      setValue={(e: any) => {
                        setFieldValue("mobile", e);
                        setBillingAddress({
                          ...billingAddress,
                          [address.id]: {
                            ...address,
                            mobile: e,
                          },
                        });
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <Button
                    type="submit"
                    className="w-20"
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Proceed
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
