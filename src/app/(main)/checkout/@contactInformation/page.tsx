"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCheckout } from "@/lib/context/CheckoutContext";
import { useQuery } from "@apollo/client";
import { GET_USER_DELIVERY_ADDRESS } from "@/lib/graphql/queries/profileQueries";
import {
  ArchiveIcon,
  LoaderIcon,
  RocketIcon,
  TruckIcon,
} from "@/components/icons";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Form, Formik } from "formik";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
  return <DeliveryAddressSection />;
  // return (
  //   <div className="w-full md:w-1/2 space-y-6">
  //     <div className="py-4">
  //       <div className="space-y-2">
  //         <h3 className="text-xl font-semibold">DELIVERY METHOD</h3>
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center space-x-2">
  //             <TruckIcon className="w-6 h-6" />
  //             <p className="text-sm">
  //               Standard Delivery
  //               <br />7 - 12 work days
  //             </p>
  //           </div>
  //           <p className="font-semibold">59.99 MYR</p>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center space-x-2">
  //             <RocketIcon className="w-6 h-6" />
  //             <p className="text-sm">
  //               Express Delivery
  //               <br />5 - 9 work days
  //             </p>
  //           </div>
  //           <p className="font-semibold">128.99 MYR</p>
  //         </div>
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center space-x-2">
  //             <ArchiveIcon className="w-6 h-6" />
  //             <p className="text-sm">
  //               Storage
  //               <br />
  //               Store your purchase at Novelship storage.
  //             </p>
  //           </div>
  //           <p className="font-semibold">9.00 MYR</p>
  //         </div>
  //         <div className="flex items-center space-x-2">
  //           <Checkbox id="declare" />
  //           <label className="text-sm" htmlFor="declare">
  //             I would like to declare and protect my delivery. Learn More
  //           </label>
  //         </div>
  //       </div>
  //       <div className="space-y-2">
  //         <h3 className="text-xl font-semibold">PAYMENT</h3>
  //         <p className="text-sm">All transactions are secure and encrypted.</p>
  //         <div className="flex items-center space-x-2">
  //           <RadioGroup defaultValue="credit-card">
  //             <div className="flex items-center space-x-2">
  //               <RadioGroupItem id="credit-card" value="credit-card" />
  //               <Label htmlFor="credit-card">Credit Card</Label>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <RadioGroupItem id="fpx" value="fpx" />
  //               <Label htmlFor="fpx">FPX</Label>
  //             </div>
  //           </RadioGroup>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

function DeliveryAddressSection() {
  const { deliveryAddress, updateDeliveryAddress } = useCheckout();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { data, loading, refetch } = useQuery(GET_USER_DELIVERY_ADDRESS);

  useEffect(() => {
    if (data?.userDeliveryAddress)
      updateDeliveryAddress(
        `${data?.userDeliveryAddress?.name}, ${
          data?.userDeliveryAddress?.address_1
        }, ${
          data?.userDeliveryAddress?.address_2
            ? `${data.userDeliveryAddress.address_2}, `
            : ""
        } ${data?.userDeliveryAddress?.city}, ${
          data?.userDeliveryAddress?.state
        }, ${data?.userDeliveryAddress?.pincode}, ${
          data?.userDeliveryAddress?.country
        }`
      );
  }, [data]);

  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold">DELIVERY ADDRESS</h2>
      {loading ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <div className="flex justify-between items-center">
          {!data?.userDeliveryAddress ? (
            <p className="text-sm text-gray-500">
              You have not added a delivery address yet.
            </p>
          ) : (
            <p className="font-normal text-xs">{deliveryAddress}</p>
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
                {data?.userDeliveryAddress ? "Change Address" : "Add Address"}
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
