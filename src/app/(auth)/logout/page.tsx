"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Component() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Logout
                </h1>
                <p className="text-center text-gray-500 dark:text-gray-400">
                    Are you sure you want to logout?
                </p>
                <div className="flex justify-center space-x-4">
                    <Button className="w-1/2" variant="outline">
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button
                        className="w-1/2"
                        onClick={() => {
                            signOut({
                                callbackUrl: "/",
                            });
                        }}
                    >
                        Yes, Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
