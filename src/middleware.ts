import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (
    request.nextUrl.pathname.startsWith("/browse") ||
    request.nextUrl.pathname.startsWith("/sneakers") ||
    request.nextUrl.pathname.startsWith("/apparels")
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }


}
