"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormField } from "@/components/form-field";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            alt="Marketplace Logo"
            className="mx-auto h-12 w-auto"
            src="/images/solesunion.png"
          />
          debugv1
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
        <div className="!mt-2 text-center text-sm font-light">
          Don't have an account?{" "}
          <Link
            className="font-medium text-gray-900 underline hover:text-gray-500 "
            href="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{
        email: "leequan2000@outlook.com",
        password: "Lquan001120-",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values)
        const response = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });
        // console.log(response);
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <p className="text-red-500 text-sm">{error}</p>
              <div className="space-y-2">
                <FormField
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/password-reset"
                    className="font-medium text-gray-900 hover:text-gray-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <Button
                className="w-full"
                type="submit"
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
              >
                Sign In
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
