"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormField } from "@/components/form-field";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <img
            src="/images/solesunion.png"
            alt="Soles Union Logo"
            className="mx-auto w-auto"
          />
          <CardTitle className="text-2xl font-bold">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="!mt-2 text-center text-sm font-light">
            Don&apos;t have an account?{" "}
            <Link
              className="font-medium text-gray-900 underline hover:text-gray-500 "
              href="/signup"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
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
        try {
          await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          })
            .then((response) => {
              if (!!!response?.error) {
                router.push("/");
              } else {
                throw new Error();
              }
            })
            .catch((e) => {
              setError("Invalid Credentials");
            });
        } catch (e) {}
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="space-y-4">
            <div>
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
                <Link
                  href="/password-reset"
                  className="font-medium text-gray-900 hover:text-gray-500"
                >
                  Forgot your password?
                </Link>
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
