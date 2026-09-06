import { redirect } from "next/navigation";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function OrdersAliasPage() {
  await requireRouteAccess("/app/orders");

  redirect("/app/sales");
}
