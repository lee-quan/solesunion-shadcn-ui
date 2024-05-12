import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "./lib/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);


  const userRole = request.auth?.user?.role;
  const isAdmin = userRole === "A";
  if (pathname === "/dashboard" || pathname === "/dashboard/offer") {
    const url = request.nextUrl.clone();

    url.pathname = isAdmin ? "/dashboard/offer/pending" :"/dashboard/offer/active";
    return NextResponse.redirect(url);
  }

  
  return NextResponse.next({
    request: {
      ...request,
      headers: requestHeaders,
    }
  });
});
