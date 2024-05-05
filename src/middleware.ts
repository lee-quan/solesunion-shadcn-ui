import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {

//   if (
//     request.nextUrl.pathname.startsWith("/browse") ||
//     request.nextUrl.pathname.startsWith("/sneakers") ||
//     request.nextUrl.pathname.startsWith("/apparels")
//   ) {
//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
//   }

//   if (request.nextUrl.pathname === "/seller") {
//     return NextResponse.redirect("http://localhost:3000/seller/offer", {
//       status: 302,
//     });
//   }
// }

import { auth } from "./lib/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (pathname === "/seller" || pathname === "/seller/offer") {
    const url = request.nextUrl.clone();
    url.pathname = "/seller/offer/active";
    return NextResponse.redirect(url);

    
  }

  
  return NextResponse.next({
    request: {
      ...request,
      headers: requestHeaders,
    }
  });
});
