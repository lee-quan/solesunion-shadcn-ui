import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.rewrite(new URL("/about-2", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
