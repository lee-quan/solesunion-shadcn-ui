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
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
        confirm_password: Yup.string().oneOf(
            [Yup.ref("password"), ""],
            "Passwords must match"
        ),
    });
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <Formik
                initialValues={{
                    email: searchParams.get("email"),
                    token: searchParams.get("token"),
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
                        <Card className="w-full max-w-lg mx-auto">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-center">
                                    Change your password
                                </CardTitle>
                            </CardHeader>
                            <Form>
                                <CardContent className="space-y-1">
                                    <FormField
                                        label="email"
                                        name="email"
                                        type="email"
                                        placeholder="email"
                                        containerClassName="hidden"
                                    />
                                    <FormField
                                        label="token"
                                        name="token"
                                        type="text"
                                        placeholder="token"
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
                                </CardContent>
                                <CardFooter>
                                    <div className="mt-4 text-center text-sm w-full">
                                        <Button
                                            className="w-full"
                                            type="submit"
                                        >
                                            Reset Password
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Form>
                        </Card>
                    );
                }}
            </Formik>
        </main>
    );
}
