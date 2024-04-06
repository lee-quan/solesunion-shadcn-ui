"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCheckout } from "@/lib/context/CheckoutContext";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { GET_USER_DELIVERY_ADDRESS } from "@/lib/graphql/queries/profileQueries";
import { LoaderIcon } from "@/components/icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/form-field";
import { UPDATE_USER_ADDRESS } from "@/lib/graphql/mutations/profileMutations";
import * as Yup from "yup";
import useMutation from "@/hooks/useMutation";

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

export default function CheckoutOptions() {
  const { promoCode } = useCheckout();
  return (
    <div className="w-full md:w-1/2 space-y-6">
      <div className="py-4">
        <DeliveryAddressSection />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">DELIVERY METHOD</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TruckIcon className="w-6 h-6" />
              <p className="text-sm">
                Standard Delivery
                <br />7 - 12 work days
              </p>
            </div>
            <p className="font-semibold">59.99 MYR</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <RocketIcon className="w-6 h-6" />
              <p className="text-sm">
                Express Delivery
                <br />5 - 9 work days
              </p>
            </div>
            <p className="font-semibold">128.99 MYR</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArchiveIcon className="w-6 h-6" />
              <p className="text-sm">
                Storage
                <br />
                Store your purchase at Novelship storage.
              </p>
            </div>
            <p className="font-semibold">9.00 MYR</p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="declare" />
            <label className="text-sm" htmlFor="declare">
              I would like to declare and protect my delivery. Learn More
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">PAYMENT</h3>
          <p className="text-sm">All transactions are secure and encrypted.</p>
          <div className="flex items-center space-x-2">
            <RadioGroup defaultValue="credit-card">
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="credit-card" value="credit-card" />
                <Label htmlFor="credit-card">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem id="fpx" value="fpx" />
                <Label htmlFor="fpx">FPX</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchiveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

function DeliveryAddressSection() {
  const { data: session } = useSession();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { data, loading, refetch } = useQuery(GET_USER_DELIVERY_ADDRESS, {
    skip: !!!session,
  });

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">DELIVERY ADDRESS</h3>
      {!!session && (
        <>
          {loading ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            <div className="flex justify-between items-center">
              {!data?.userDeliveryAddress ? (
                <p className="text-sm text-gray-500">
                  You have not saved a delivery address yet.
                </p>
              ) : (
                <div className="flex items-center justify-between rounded-sm py-3">
                  <div>
                    <p className="font-normal text-xs">
                      {data?.userDeliveryAddress?.name}
                    </p>
                    <p className="text-xs font-light">
                      {data?.userDeliveryAddress?.address_1}
                      {data?.userDeliveryAddress?.address_2
                        ? `, ${data.userDeliveryAddress.address_2}`
                        : ""}
                      , {data?.userDeliveryAddress?.city},{" "}
                      {data?.userDeliveryAddress?.state}{" "}
                      {data?.userDeliveryAddress?.pincode},{" "}
                      {data?.userDeliveryAddress?.country}
                    </p>
                  </div>
                </div>
              )}
              <Drawer open={showAddressForm}>
                <DrawerTrigger asChild className="flex items-center">
                  <Button
                    className="text-xs underline hover:bg-transparent"
                    variant="ghost"
                    onClick={() => {
                      setShowAddressForm(true);
                    }}
                  >
                    {data?.userDeliveryAddress
                      ? "Change Address"
                      : "Add Address"}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Edit Address</DrawerTitle>
                    <DrawerDescription>
                      Update your delivery address.
                    </DrawerDescription>
                  </DrawerHeader>
                  <AddressForm
                    refetch={refetch}
                    selectedAddress={
                      data?.userDeliveryAddress || {
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
                      }
                    }
                    setShowAddressForm={setShowAddressForm}
                  />
                </DrawerContent>
              </Drawer>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AddressForm({
  refetch,
  selectedAddress,
  setShowAddressForm,
}: {
  refetch: () => void;
  selectedAddress: AddressType;
  setShowAddressForm: (value: boolean) => void;
}) {
  const [updateUserAddress] = useMutation(UPDATE_USER_ADDRESS, {
    onSuccess: () => {
      setShowAddressForm(false);
      refetch();
    },
  });

  const validationSchema = Yup.object().shape({
    // address_1, address_2, name, address_type, pincode, city, country, state, mobile
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
          ...selectedAddress,
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await updateUserAddress({
            variables: {
              ...values,
            },
          });
          setShowAddressForm(false);
          resetForm();
        }}
      >
        {({ isSubmitting, errors }) => {
          console.log(errors);
          return (
            <Form>
              <Card className="py-3 border-none">
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
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
                    />
                    <FormField
                      name="address_1"
                      label="Address Line 1"
                      type="text"
                      placeholder="Enter your address"
                      containerClassName="col-span-2"
                    />
                    <FormField
                      name="address_2"
                      label="Address Line 2"
                      type="text"
                      placeholder="Enter your address"
                      containerClassName="col-span-2"
                    />
                    <FormField
                      name="city"
                      label="City"
                      type="text"
                      placeholder="Enter your city"
                      containerClassName="col-span-2 lg:col-span-1"
                    />
                    <FormField
                      name="state"
                      label="State"
                      type="text"
                      placeholder="Enter your state"
                      containerClassName="col-span-2 lg:col-span-1"
                    />
                    <FormField
                      name="pincode"
                      label="Pincode"
                      type="text"
                      placeholder="Enter your pincode"
                      containerClassName="col-span-2 lg:col-span-1"
                    />
                    <FormField
                      name="country"
                      label="Country"
                      type="text"
                      placeholder="Enter your country"
                      containerClassName="col-span-2 lg:col-span-1"
                    />
                    <FormField
                      name="mobile"
                      label="Mobile"
                      type="text"
                      placeholder="Enter your mobile number (including country code) eg: +60123456789"
                      containerClassName="col-span-2 lg:col-span-1"
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
                    Save
                  </Button>
                  <Button
                    className="w-20"
                    onClick={() => {
                      setShowAddressForm(false);
                    }}
                  >
                    Cancel
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

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
      <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
      <circle cx="7" cy="18" r="2" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function Users2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 19a6 6 0 0 0-12 0" />
      <circle cx="8" cy="9" r="4" />
      <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
    </svg>
  );
}
