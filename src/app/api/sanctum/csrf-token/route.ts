import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await fetch("https://dev-api.solesunion.com/sanctum/csrf-cookie");

  const setCookieHeader = res.headers.get("set-cookie");
  const { token } = await res.json();
  const cookiesFromHeader = setCookieHeader?.split(", ");
  let sessionKey = null;
  let xsrfToken = null;
  let csrfToken = token;
  for (const cookie of cookiesFromHeader!) {
    if (cookie.startsWith("laravel_session=")) {
      sessionKey = cookie.split("=")[1];
    } else if (cookie.startsWith("XSRF-TOKEN=")) {
      xsrfToken = cookie.split("=")[1];
    }

    if (sessionKey && xsrfToken) {
      break;
    }
  }
  const headers: any = {
    Cookie: `laravel_session=${sessionKey}`,
    "X-CSRF-TOKEN": csrfToken,
    "Content-Type": "application/json",
  };
  if (xsrfToken) {
    headers["X-XSRF-TOKEN"] = xsrfToken;
  }

  return NextResponse.json(headers);
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: true });
}
