"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
    CreditCardIcon,
    HomeIcon,
    LogOutIcon,
    PackageIcon,
    SettingsIcon,
    ShoppingCartIcon,
    UserIcon,
} from "@/components/icons";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <div className="min-h-[calc(100vh-80px)] w-full overflow-hidden lg:grid-cols-[280px_1fr] lg:flex">
            <ProfileSideBar pathname={pathname} />
            <ProfileMenu pathname={pathname} />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                {children}
            </main>
        </div>
    );
}

function ProfileSideBar({ pathname }: { pathname: string }) {
    return (
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link
                        className="flex items-center gap-2 font-semibold"
                        href="#"
                    >
                        <UserIcon className="h-6 w-6" />
                        <span className="">User Profile</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <ProfileNavigationItems pathname={pathname} />
                    </nav>
                </div>
            </div>
        </div>
    );
}

function ProfileMenu({ pathname }: { pathname: string }) {
    return (
        <header className="lg:hidden flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 sticky top-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="lg:hidden rounded-full border border-gray-200 w-8 h-8"
                        size="icon"
                        variant="ghost"
                    >
                        <UserIcon className="h-6 w-6" />

                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ProfileNavigationItems pathname={pathname} />
                    </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}

const profileNavigationLinks = [
    {
        label: "Profile",
        href: "/profile",
        icon: UserIcon,
        onclick: () => {},
    },
    {
        label: "Addresses",
        href: "/profile/addresses",
        icon: HomeIcon,
        onclick: () => {},
    },
    {
        label: "Orders",
        href: "/profile/orders",
        icon: ShoppingCartIcon,
        onclick: () => {},
    },
    {
        label: "Listings",
        href: "/profile/listings",
        icon: PackageIcon,
        onclick: () => {},
    },
    {
        label: "Payout Information",
        href: "/profile/payout",
        icon: CreditCardIcon,
        onclick: () => {},
    },
    {
        label: "Settings",
        href: "/profile/settings",
        icon: SettingsIcon,
        onclick: () => {},
    },
    {
        label: "Logout",
        href: "/",
        icon: LogOutIcon,
        onclick: () => {
            signOut({
                callbackUrl: "/",
            });
        },
        className:
            "mt-9 flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-red-500 hover:text-red-900",
    },
];

function ProfileNavigationItems({ pathname }: { pathname: string }) {
    return (
        <>
            {profileNavigationLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className={
                        link.className
                            ? link.className
                            : cn(
                                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900",
                                  pathname === link.href
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-500"
                              )
                    }
                    onClick={link.onclick}
                >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                </Link>
            ))}
        </>
    );
}
