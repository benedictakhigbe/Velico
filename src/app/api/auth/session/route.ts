import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";

const sessionSchema = z.object({
  idToken: z.string().min(20),
});

export async function POST(request: Request) {
  const payload = sessionSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid session payload." }, { status: 400 });
  }

  try {
    const expiresIn = 5 * 24 * 60 * 60 * 1000;
    const sessionCookie = hasFirebaseAdminCredentials()
      ? await adminAuth().createSessionCookie(payload.data.idToken, {
          expiresIn,
        })
      : payload.data.idToken;
    const response = NextResponse.json({ ok: true });

    response.cookies.set("__session", sessionCookie, {
      maxAge: hasFirebaseAdminCredentials() ? expiresIn / 1000 : 60 * 55,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Could not create session." }, { status: 401 });
  }
}
