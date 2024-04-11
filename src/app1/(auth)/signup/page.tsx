"use client";

import { FormField } from "@/components/form-field";
import { LoaderIcon } from "@/components/icons";
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        alt="Soles Union Logo"
                        className="mx-auto h-12 w-auto"
                        src="/images/solesunion.png"
                    />
                    <h2 className="mt-2 text-center text-base lg:text-3xl font-extrabold text-gray-900">
                        Sign up for a new account
                    </h2>
                </div>

                <RegisterForm />

                <div className="!mt-2 text-center text-sm font-light">
                    Already have an account?{" "}
                    <Link
                        className="font-medium text-gray-900 underline hover:text-gray-500 "
                        href="/login"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
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
                <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="space-y-1">
                            <FormField
                                label="Name"
                                name="name"
                                type="text"
                                placeholder="Name"
                            />
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
                            <FormField
                                label="Confirm Password"
                                name="confirm_password"
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <FormField
                                label="Mobile"
                                name="mobile"
                                type="number"
                                placeholder="Mobile"
                            />
                            <FormField
                                label="Birthdate"
                                name="birthdate"
                                type="date"
                                placeholder="Birthdate"
                            />
                            <FormField
                                label="Referral Code"
                                name="referral_code"
                                type="text"
                                placeholder="Referral Code"
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
