import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "@/config/api";

/**
 * Verifies the HttpOnly `session` cookie against the JSON Server `sessions`
 * collection. Fails closed: any upstream error or missing row = not logged in.
 */
async function getSession(token: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/sessions?token=${encodeURIComponent(token)}`
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  } catch {
    return null;
  }
}

const redirectToLogin = (request: NextRequest) => {
  const url = new URL("/auth/login", request.url);
  const response = NextResponse.redirect(url);
  response.cookies.delete("session");
  return response;
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Admin area: session required AND role must be "admin" (from the server,
  // never from a client-set cookie).
  if (pathname.startsWith("/admin")) {
    if (!token) return redirectToLogin(request);
    const session = await getSession(token);
    if (!session || session.role !== "admin") return redirectToLogin(request);
  }

  // Already-logged-in users hitting the login page get bounced home.
  if (pathname === "/auth/login") {
    if (token) {
      const session = await getSession(token);
      if (session) {
        return NextResponse.redirect(
          new URL(session.role === "admin" ? "/admin" : "/", request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};
