import { DashboardOverview } from "@/features/dashboard/dashboard-overview";
import { getCurrentPlanForOrganization } from "@/lib/billing/subscription-access";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";

export default async function AppHomePage() {
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);
  const planCode = organizationId ? await getCurrentPlanForOrganization(organizationId) : "trial";

  return <DashboardOverview ownerName={user.name ?? user.email ?? "Owner"} planCode={planCode} />;
}
