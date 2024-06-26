import type { Metadata } from "next";
import { Inter, Roboto_Condensed, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Providers from "../lib/Providers";
import SessionProvider from "@/lib/auth/SessionProvider";
import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soles Union",
  description: "Soles Union",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased relative",
          roboto.className
        )}
      >
        <NextTopLoader
          color="#000000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #000000,0 0 5px #ffffff"
        />

        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
