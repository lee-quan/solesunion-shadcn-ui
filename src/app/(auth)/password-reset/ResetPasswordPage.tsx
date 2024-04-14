"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useMutation from "@/hooks/useMutation";
import {
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
} from "@/lib/graphql/mutations/authMutations";
import { Form, Formik } from "formik";
import { FormField } from "@/components/form-field";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingDots } from "@/components/icons";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: {
    token?: string;
    email?: string;
  };
}) {
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <img
        src="/image/solesunion.png"
        alt="Soles Union Logo"
        className="mx-auto w-auto"
      />
      {!!searchParams?.token && !!searchParams?.email ? (
        <PasswordForm email={searchParams?.email} token={searchParams?.token} />
      ) : (
        <EmailForm setIsEmailSent={setIsEmailSent} isEmailSent={isEmailSent} />
      )}
    </main>
  );
}

function EmailForm({
  setIsEmailSent,
  isEmailSent,
}: {
  setIsEmailSent: (value: boolean) => void;
  isEmailSent: boolean;
}) {
  const [resetPassword] = useMutation(FORGOT_PASSWORD_MUTATION, {
    showToast: false,
    onSuccess: () => {
      setIsEmailSent(true);
    },
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });
  if (isEmailSent)
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Email sent</CardTitle>
          <CardDescription className="">
            We sent you an email. Follow the instructions to get back into your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm w-full space-y-2">
            <Button asChild className="w-full" type="submit">
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Reset your password
        </CardTitle>
        <CardDescription className="">
          Enter your email address, and we&apos;ll send you a link to reset your
          password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            resetPassword({ variables: values });
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="space-y-4">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <div className="text-center text-sm w-full space-y-2">
                  <Button
                    className="w-full disabled:bg-gray-600"
                    type="submit"
                    disabled={isSubmitting}
                    isSubmitting={isSubmitting}
                  >
                    Reset Password
                  </Button>
                  <p>
                    Remembered your password?
                    <Link className="underline ml-1" href="/login">
                      Log in
                    </Link>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
}

function PasswordForm({ email, token }: { email: string; token: string }) {
  const router = useRouter();
  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION, {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Passwords must match"
    ),
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Reset your password
        </CardTitle>
        <CardDescription className="">
          Please enter your new password below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            email,
            token,
            password: "",
            confirm_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            resetPassword({
              variables: {
                email: values.email,
                password: values.password,
                token: values.token,
              },
            });
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="space-y-4">
                <FormField
                  label="token"
                  name="token"
                  type="text"
                  placeholder="token"
                  containerClassName="hidden"
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  containerClassName="hidden"
                />
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <FormField
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                />
                <div className="mt-4 text-center text-sm w-full">
                  <Button className="w-full" type="submit">
                    Change Password
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
}
