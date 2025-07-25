import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_ROUTES,
  DASHBOARD_ROUTES,
  EMPLOYER_ROUTES,
} from "./src/constants/routes";

// Define route patterns for authentication checks
const publicRoutes = [
  "/",
  "/jobs",
  "/companies",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/test-i18n", // Test page
];

const authRoutes = Object.values(AUTH_ROUTES);
const protectedRoutes = [
  ...Object.values(DASHBOARD_ROUTES),
  ...Object.values(EMPLOYER_ROUTES),
  "/dashboard", // All dashboard routes are protected
];

/**
 * Middleware for handling authentication and language preferences
 * This middleware works with the existing HttpOnly cookie authentication system
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") // Static files (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Get authentication token from HttpOnly cookie
  const accessToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = !!accessToken;

  console.log(
    `[Middleware] Path: ${pathname}, Token exists: ${!!accessToken}, Authenticated: ${isAuthenticated}`
  );

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Check if current route is auth route
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Handle authentication redirects
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect unauthenticated users to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect authenticated users away from auth pages
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");

    // Validate callbackUrl để prevent open redirect attacks
    let redirectUrl = "/dashboard"; // Default redirect

    if (
      callbackUrl &&
      callbackUrl !== "/login" &&
      callbackUrl !== "/register" &&
      callbackUrl.startsWith("/") &&
      !callbackUrl.startsWith("//")
    ) {
      redirectUrl = callbackUrl;
    }

    console.log(
      `[Auth Middleware] Redirecting authenticated user from ${pathname} to ${redirectUrl}`
    );
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Handle language preferences
  const response = NextResponse.next();

  // Get language preference from cookie or header
  const languageCookie = request.cookies.get("user-language")?.value;
  const acceptLanguage = request.headers.get("accept-language");

  // Set language preference in response headers for client-side access
  if (languageCookie) {
    response.headers.set("x-user-language", languageCookie);
  } else if (acceptLanguage) {
    // Parse Accept-Language header and set default if Vietnamese is preferred
    const preferredLanguage = acceptLanguage.includes("vi") ? "vi" : "en";
    response.headers.set("x-user-language", preferredLanguage);

    // Set cookie for future requests
    response.cookies.set("user-language", preferredLanguage, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
