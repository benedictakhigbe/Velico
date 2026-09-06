import type { PaystackPlanCode } from "@/lib/billing/plans";

export const planRank: Record<PaystackPlanCode, number> = {
  trial: 0,
  starter: 1,
  growth: 2,
  business: 3,
};

export const routeAccessRules = [
  { path: "/app", minimumPlan: "trial", featureName: "Dashboard" },
  { path: "/app/billing", minimumPlan: "trial", featureName: "Billing" },
  { path: "/app/settings", minimumPlan: "trial", featureName: "Settings" },
  { path: "/app/onboarding", minimumPlan: "trial", featureName: "Onboarding" },
  { path: "/app/sales", minimumPlan: "starter", featureName: "Sales and orders" },
  { path: "/app/orders", minimumPlan: "starter", featureName: "Sales and orders" },
  { path: "/app/products", minimumPlan: "starter", featureName: "Products and services" },
  { path: "/app/inventory", minimumPlan: "starter", featureName: "Inventory" },
  { path: "/app/customers", minimumPlan: "starter", featureName: "Customers" },
  { path: "/app/expenses", minimumPlan: "starter", featureName: "Expenses" },
  { path: "/app/finance", minimumPlan: "starter", featureName: "Finance" },
  { path: "/app/invoices", minimumPlan: "starter", featureName: "Invoices" },
  { path: "/app/reports", minimumPlan: "starter", featureName: "Reports" },
  { path: "/app/analytics", minimumPlan: "starter", featureName: "Reports" },
  { path: "/app/ai", minimumPlan: "starter", featureName: "Velico AI" },
  { path: "/app/ai-advisor", minimumPlan: "starter", featureName: "Velico AI" },
  { path: "/app/notifications", minimumPlan: "starter", featureName: "Notifications" },
  { path: "/app/staff", minimumPlan: "growth", featureName: "Staff performance" },
  { path: "/app/automations", minimumPlan: "growth", featureName: "Automations" },
  { path: "/app/team", minimumPlan: "growth", featureName: "Team access" },
  { path: "/app/integrations", minimumPlan: "business", featureName: "Integrations" },
] as const satisfies ReadonlyArray<{
  path: string;
  minimumPlan: PaystackPlanCode;
  featureName: string;
}>;

export type RouteAccessRule = (typeof routeAccessRules)[number];

export function normalizePlanCode(planCode: string | null | undefined): PaystackPlanCode {
  if (planCode === "starter" || planCode === "growth" || planCode === "business") {
    return planCode;
  }

  return "trial";
}

export function getRouteAccessRule(pathname: string): {
  path: string;
  minimumPlan: PaystackPlanCode;
  featureName: string;
} {
  const normalizedPathname = pathname.split("?")[0] || "/app";
  const matchingRule = [...routeAccessRules]
    .sort((a, b) => b.path.length - a.path.length)
    .find((rule) => normalizedPathname === rule.path || normalizedPathname.startsWith(`${rule.path}/`));

  return matchingRule ?? { path: pathname, minimumPlan: "business", featureName: "This feature" };
}

export function canUseRoute(planCode: string | null | undefined, pathname: string) {
  const currentPlan = normalizePlanCode(planCode);
  const requiredPlan = getRouteAccessRule(pathname).minimumPlan;

  return planRank[currentPlan] >= planRank[requiredPlan];
}

export function getPlanFeatures(planCode: PaystackPlanCode) {
  return routeAccessRules.filter((rule) => canUseRoute(planCode, rule.path));
}
