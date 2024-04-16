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
          <Link className="flex items-center gap-2 font-semibold" href="#">
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

function SellerNavigationItems({ pathname }: { pathname: string }) {
  return (
    <>
      <Link
        href={"/profile/payout"}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-500 hover:text-gray-900",
          pathname === "/profile/payout"
            ? "bg-gray-100 text-gray-900"
            : "text-gray-500"
        )}
        onClick={() => {}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
        Payout Information
      </Link>
      <Link
        href={"/seller"}
        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-gray-500 hover:text-gray-900"
        onClick={() => {}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
        Listings
      </Link>
    </>
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
  // {
  //     label: "Listings",
  //     href: "/profile/listings",
  //     icon: PackageIcon,
  //     onclick: () => {},
  // },
  // {
  //     label: "Payout Information",
  //     href: "/profile/payout",
  //     icon: CreditCardIcon,
  //     onclick: () => {},
  // },
  {
    label: "Settings",
    href: "/profile/settings",
    icon: SettingsIcon,
    onclick: () => {},
  },
];

function ProfileNavigationItems({ pathname }: { pathname: string }) {
  return (
    <>
      {profileNavigationLinks.map(
        (
          link: {
            label: string;
            href: string;
            icon: any;
            onclick: () => void;
          },
          index
        ) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900",
              pathname === link.href
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        )
      )}
      <SellerNavigationItems pathname={pathname} />

      <Link
        className="mt-9 flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-red-500 hover:text-red-900"
        href={{}}
      >
        <LogOutIcon className="h-4 w-4" />
        Logout
      </Link>
    </>
  );
}
