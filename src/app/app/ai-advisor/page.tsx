import { redirect } from "next/navigation";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function AiAdvisorAliasPage() {
  await requireRouteAccess("/app/ai-advisor");

  redirect("/app/ai");
}
