"use client";

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import {
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenu,
} from "@/components/ui/navigation-menu";
import { BlackLogo, CheckIcon, MenuIcon, ShieldIcon, TagIcon } from "./icons";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const NavigationLinks = [
    {
        title: "Home",
        href: "/",
        auth: false,
    },
    {
        title: "Sneakers",
        href: "/sneakers",
        auth: false,
    },
    {
        title: "Apparels",
        href: "/apparels",
        auth: false,
    },
    {
        title: "Profile",
        href: "/profile",
        auth: true,
    },
];

export default function NavigationBar() {
    const { data: session } = useSession();
    return (
        <>
            <NotificationBar />
            <header className="sticky top-0 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className="lg:hidden"
                            size="icon"
                            variant="outline"
                        >
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="flex flex-col justify-between h-full"
                    >
                        <div>
                            <Link href="/" className="flex justify-center">
                                <BlackLogo className="h-6 w-6" />
                                <span className="sr-only">Soles Union</span>
                            </Link>
                            <div className="grid gap-2 py-6">
                                {NavigationLinks.map((link) => (
                                    <Link
                                        key={link.title}
                                        className={cn(
                                            "w-full items-center py-2 text-lg font-semibold text-center",
                                            link.auth
                                                ? session
                                                    ? "block"
                                                    : "hidden"
                                                : "block"
                                        )}
                                        href={link.href}
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 p-2">
                            {session ? (
                                <Link
                                    className="block w-full items-center py-2 text-lg font-semibold text-center"
                                    href="/"
                                    onClick={() => {
                                        signOut({
                                            callbackUrl: "/",
                                        });
                                    }}
                                >
                                    Logout
                                </Link>
                            ) : (
                                <>
                                    <Button asChild variant="outline">
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href="signup">Sign Up</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="mr-6 hidden lg:flex" href="#">
                    <BlackLogo className="h-6 w-6" />
                    <span className="sr-only">Sneaker Marketplace</span>
                </Link>
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList>
                        {NavigationLinks.map((link) => (
                            <NavigationMenuLink asChild key={link.title}>
                                <Link
                                    className={cn(
                                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
                                        link.auth && !session
                                            ? "hidden"
                                            : "block"
                                    )}
                                    href={link.href}
                                >
                                    {link.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                {!session && (
                    <div className="ml-auto flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </header>
        </>
    );
}

export function NotificationBar() {
    return (
        <div className="bg-blue-500 py-1">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-center text-sm md:text-base text-gray-200">
                    <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        <span>Authentic</span>
                    </div>
                    <div className="flex items-center gap-2 mx-4 md:mx-6">
                        <TagIcon className="h-4 w-4" />
                        <span>Brand New</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldIcon className="h-4 w-4" />
                        <span>Protected Deliveries</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
