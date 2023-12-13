import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "@/routes/route";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token && !role) {
    request.cookies.delete("token");
    request.cookies.delete("role");

    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");

    return response;
  }

  // if (authRoutes.includes(request.nextUrl.pathname) && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  if (
    authRoutes.includes(request.nextUrl.pathname) &&
    token &&
    role == "admin"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}
