import { redirect } from "next/navigation";
import { adminDb, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";
import { canUseRoute, normalizePlanCode } from "@/lib/billing/plan-access";
import type { PaystackPlanCode } from "@/lib/billing/plans";

const activeSubscriptionStatuses = new Set(["active", "trialing"]);

export async function getCurrentPlanForOrganization(organizationId: string): Promise<PaystackPlanCode> {
  if (organizationId === "demo-organization") {
    return "business";
  }

  if (!hasFirebaseAdminCredentials()) {
    return "trial";
  }

  try {
    const snapshot = await adminDb().collection("subscriptions").doc(organizationId).get();
    const subscription = snapshot.data();
    const planCode = normalizePlanCode(subscription?.planCode);
    const status = String(subscription?.status ?? "");

    if (planCode !== "trial" && activeSubscriptionStatuses.has(status)) {
      return planCode;
    }
  } catch {
    return "trial";
  }

  return "trial";
}

export async function requireRouteAccess(pathname: string) {
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    redirect("/app/onboarding");
  }

  const planCode = await getCurrentPlanForOrganization(organizationId);

  if (!canUseRoute(planCode, pathname)) {
    redirect(`/app/billing?feature=${encodeURIComponent(pathname)}`);
  }

  return { user, organizationId, planCode };
}
