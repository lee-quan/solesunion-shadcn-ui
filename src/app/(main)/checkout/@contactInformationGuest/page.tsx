"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useCheckout } from "@/lib/context/CheckoutContext";
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
import * as Yup from "yup";
import { Input } from "@/components/ui/input";

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
  return (
    <>
      <EmailAddressSection />
      <DeliveryAddressSection />
    </>
  );
}

function DeliveryAddressSection() {
  const { deliveryAddress, updateDeliveryAddress } = useCheckout();
  const [addressData, setAddressData] = useState<AddressType>({
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
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    if (addressData.address_type != "new") {
      updateDeliveryAddress(
        `${addressData.name}, ${addressData.address_1}, ${
          addressData.address_2 ? `${addressData.address_2}, ` : ""
        } ${addressData.city}, ${addressData.state}, ${addressData.pincode}, ${
          addressData.country
        }`
      );
    }
  }, [addressData, updateDeliveryAddress]);

  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold">DELIVERY ADDRESS</h2>
      <div className="flex justify-between items-center">
        {addressData.address_type === "new" ? (
          <p className="text-xs text-gray-500">
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
              {deliveryAddress ? "Change Address" : "Add Address"}
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
              selectedAddress={{
                ...addressData,
              }}
              setAddressData={setAddressData}
              setShowAddressForm={setShowAddressForm}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

function EmailAddressSection() {
  const { emailAddress, updateEmailAddress } = useCheckout();

  return (
    <div className="space-y-2">
      <h2 className="text-xs font-bold">EMAIL ADDRESS</h2>
      <p className="text-xs">
        To receive receipt of payment, please enter your email address below.
      </p>
      <div className="flex justify-between items-center">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={emailAddress}
          onChange={(e) => updateEmailAddress(e.target.value)}
        />
      </div>
    </div>
  );
}

function AddressForm({
  selectedAddress,
  setShowAddressForm,
  setAddressData,
}: {
  selectedAddress: AddressType;
  setShowAddressForm: (value: boolean) => void;
  setAddressData: (value: AddressType) => void;
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
          ...selectedAddress,
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setShowAddressForm(false);
          setAddressData({
            ...values,
            address_type: "added",
          });
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
