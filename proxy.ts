import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes — accessible without login
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Redirect unauthenticated users trying to access protected pages
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect logged-in users away from login/signup
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Protect all routes except Next.js internals and static files
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
