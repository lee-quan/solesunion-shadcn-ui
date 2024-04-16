"use client";

import { FormField } from "@/components/form-field";
import { LoaderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMutation from "@/hooks/useMutation";
import { UPDATE_USER_ADDRESS } from "@/lib/graphql/mutations/profileMutations";
import { GET_USER_ADDRESSES } from "@/lib/graphql/queries/profileQueries";
import { useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function AddressesPage() {
  const { data, loading, refetch } = useQuery(GET_USER_ADDRESSES);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
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
  return (
    <>
      <div className="flex gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Addresses</h1>
      </div>
      {loading ? (
        <LoaderIcon className="h-6 w-6" />
      ) : showAddressForm ? (
        <AddressForm
          setShowAddressForm={setShowAddressForm}
          refetch={refetch}
          selectedAddress={selectedAddress}
        />
      ) : data?.userAddress.length > 0 ? (
        <>
          <AddressesDisplay
            addresses={data.userAddress}
            setShowAddressForm={setShowAddressForm}
            setSelectedAddress={setSelectedAddress}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold text-2xl tracking-tight">
              You have no addresses
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You can start adding addresses by clicking the button below.
            </p>
            <Button
              className="mt-4"
              onClick={() => {
                setShowAddressForm(true);
              }}
            >
              Add New Address
            </Button>
          </div>
        </>
      )}
    </>
  );
}

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
          return (
            <Form>
              <Card className="py-3">
                <CardHeader>
                  <CardTitle>Add New Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                </CardFooter>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

function AddressesDisplay({
  addresses,
  setShowAddressForm,
  setSelectedAddress,
}: {
  addresses: AddressType[];
  setShowAddressForm: (value: boolean) => void;
  setSelectedAddress: (value: AddressType) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {addresses.map((address) => (
        <Card key={address.id}>
          <CardHeader>
            <CardTitle>
              {address.address_type === "D"
                ? "Delivery Address"
                : "Billing Address"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {address.name}
                </p>
                <p>{address.address_1}</p>
                <p>{address.address_2}</p>
                <p>
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p>{address.country}</p>
                <p>{address.mobile}</p>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddressForm(true);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
