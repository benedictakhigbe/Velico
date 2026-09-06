import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";

export type SessionUser = {
  uid: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session")?.value;
  const demoSession = cookieStore.get("__demo_session")?.value;

  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true" && demoSession === "velico-demo") {
    return {
      uid: "demo-owner",
      email: "demo@velico.app",
      name: "Demo Owner",
      phoneNumber: "+2348000000000",
    };
  }

  if (!session) {
    return null;
  }

  try {
    const decoded = await adminAuth()
      .verifySessionCookie(session, true)
      .catch(() => adminAuth().verifyIdToken(session, true));

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      phoneNumber: decoded.phone_number,
    };
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return { user };
}

export async function getActiveOrganizationId(userId: string) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true" && userId === "demo-owner") {
    return "demo-organization";
  }

  if (!hasFirebaseAdminCredentials()) {
    return "setup-organization";
  }

  const snapshot = await adminDb()
    .collection("organizationMembers")
    .where("userId", "==", userId)
    .where("status", "==", "active")
    .limit(1)
    .get();

  return snapshot.docs[0]?.data().organizationId as string | undefined;
}
