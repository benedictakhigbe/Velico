import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAppRoute = request.nextUrl.pathname.startsWith("/app");
  const hasFirebaseSession = request.cookies.has("__session");
  const hasDemoSession =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" &&
    request.cookies.get("__demo_session")?.value === "velico-demo";

  if (isAppRoute && !hasFirebaseSession && !hasDemoSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
