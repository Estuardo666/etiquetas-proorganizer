import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_EXCHANGE_TTL_SECONDS,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createAdminSessionToken,
  isSafeReturnTo,
  verifyAdminToken,
} from "@/lib/admin-session";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export function GET(request: NextRequest) {
  const returnToCandidate = request.nextUrl.searchParams.get("returnTo");
  const returnTo = isSafeReturnTo(returnToCandidate) ? returnToCandidate : "/";
  const exchangeToken = request.nextUrl.searchParams.get("token");
  const user = verifyAdminToken(exchangeToken, ADMIN_EXCHANGE_TTL_SECONDS + 30);
  const redirectUrl = new URL(returnTo, request.nextUrl.origin);
  const response = NextResponse.redirect(redirectUrl, 303);
  response.headers.set("Cache-Control", NO_STORE_HEADERS["Cache-Control"]);

  if (!user) return response;

  const sessionToken = createAdminSessionToken(user);
  if (!sessionToken) return response;

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: sessionToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
    priority: "high",
  });
  return response;
}

export function DELETE() {
  const response = NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
