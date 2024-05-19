import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  const privateRoute = ["/my-profile", "/history-order"];
  const auth = ["/login", "/register"];

  if (privateRoute.some((route) => route === request.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (auth.some((route) => route === request.nextUrl.pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/my-profile", request.url));
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
