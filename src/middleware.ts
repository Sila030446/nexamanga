import { NextRequest, NextResponse } from "next/server";
import Authenticated from "./app/(auth)/authenticated";

import { cookies } from "next/headers";
import {
  getAuthCookie,
  REFRESH_TOKEN_COOKIE,
} from "./app/(auth)/contexts/auth-cookie";

import API_URL from "@/common/constants/api";
import { fetchProfileData } from "@/app/user/profile/profile";

const protectedRoutes = ["/settings", "/admin", "/user/profile"]; // Ensure the path is correct

export async function middleware(request: NextRequest) {
  const user = await fetchProfileData();
  const role = user?.role || "USER"; // Default to USER if no role is found
  const allowedRoles = ["ADMIN"]; // Define roles that can access protected routes

  // Refresh token logic
  const refreshToken = cookies().get(REFRESH_TOKEN_COOKIE)?.value;

  if (!Authenticated() && refreshToken) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      headers: {
        Cookie: cookies().toString(),
      },
      method: "POST",
    });

    const authCookies = getAuthCookie(refreshRes);

    if (authCookies?.accessToken) {
      const response = NextResponse.next();
      response.cookies.set(authCookies.accessToken);
      return response; // If the token is refreshed, proceed to the next middleware
    }
  }

  // Check for protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Unauthenticated route check
  if (!Authenticated() && isProtectedRoute) {
    console.log("Redirecting to login from protected route:", request.url);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based access control for protected routes
  if (
    isProtectedRoute &&
    !allowedRoles.includes(role) &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    console.log("Access denied to admin route:", request.url);
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home if access denied
  }

  // Allow access to the request if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
