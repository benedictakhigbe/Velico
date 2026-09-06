import { redirect } from "next/navigation";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function AnalyticsAliasPage() {
  await requireRouteAccess("/app/analytics");

  redirect("/app/reports");
}
