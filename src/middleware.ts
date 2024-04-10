import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const url = request.nextUrl.clone();

  if (pathname === "/cart") {
    url.pathname = "/cart/checkout";
    return NextResponse.redirect(url);
  }

  if (!token) {
    if (pathname.includes("/dashboard")) {
      url.pathname = `/login?r=${pathname}`;
      return NextResponse.redirect(
        `${process.env.FRONTEND_URL}/login?r=${pathname}`
      );
    }
    if (pathname.includes("sell")) {
      const searchParams = request.nextUrl.searchParams;
      return NextResponse.redirect(
        `${
          process.env.FRONTEND_URL
        }/login?r=${pathname}?${searchParams.toString()}`
      );
    }
  }
  if (token) {
    if (pathname.includes("/login") || pathname.includes("/register")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    if (pathname === "/dashboard") {
      url.pathname = "/dashboard/profile";
      return NextResponse.redirect(url);
    }
  }

  return res;
}
