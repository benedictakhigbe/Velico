import { NextResponse } from "next/server";

export async function POST() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") {
    return NextResponse.json({ error: "Demo mode is disabled." }, { status: 404 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("__demo_session", "velico-demo", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
