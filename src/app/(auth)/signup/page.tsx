"use client";

import { FormField } from "@/components/form-field";
import { LoaderIcon } from "@/components/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_MUTATION } from "@/lib/graphql/mutations/authMutations";
import { useMutation } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

export default function SignupPage() {
  const [register] = useMutation(REGISTER_MUTATION);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirm_password: Yup.string()
      .required("Required")
      .equals([Yup.ref("password")], "Passwords must match"),
    mobile: Yup.number().required("Required"),
    birthdate: Yup.date().required("Required"),
    referral_code: Yup.string(),
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-0 lg:px-8">
      <Card className="w-full md:max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <img
            src="/images/solesunion.png"
            alt="Soles Union Logo"
            className="mx-auto w-auto"
          />
          <CardTitle className="text-base md:text-2xl font-bold text-center">
            Sign up for a new account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <div className="!mt-2 text-center font-light flex justify-center w-full">
            Already have an account?{" "}
            <Link
              className="font-medium text-gray-900 underline hover:text-gray-500 ml-2"
              href="/login"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

function RegisterForm() {
  const [register] = useMutation(REGISTER_MUTATION);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirm_password: Yup.string()
      .required("Required")
      .equals([Yup.ref("password")], "Passwords must match"),
    mobile: Yup.number().required("Required"),
    birthdate: Yup.date().required("Required"),
    referral_code: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        mobile: "",
        birthdate: "",
        referral_code: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        register({
          variables: {
            name: values.name,
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            birthdate: values.birthdate,
            referral_code: values.referral_code,
          },
        }).then((response) => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting, setFieldValue, errors }) => (
        <Form className="space-y-4">
          <div>
            <div className="space-y-2">
              <FormField
                label="Name"
                name="name"
                type="text"
                placeholder="Name"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
              <FormField
                label="Email address"
                name="email"
                type="email"
                placeholder="Email address"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
              <FormField
                label="Confirm Password"
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
              <FormField
                label="Mobile"
                name="mobile"
                type="number"
                placeholder="Mobile"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
              <FormField
                label="Birthdate"
                name="birthdate"
                type="date"
                placeholder="Birthdate"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
              <FormField
                label="Referral Code"
                name="referral_code"
                type="text"
                placeholder="Referral Code"
                containerClassName="grid-cols-7"
                labelContainerClassName="col-span-3 flex justify-end items-center h-full"
                labelClassName=""
                inputClassName="col-span-4"
              />
            </div>
          </div>
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderIcon className="animate-spin h-5 w-5" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
