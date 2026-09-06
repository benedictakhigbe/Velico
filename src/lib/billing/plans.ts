export const paystackPlans = {
  trial: {
    code: "trial",
    name: "Free / Trial",
    monthlyAmount: 0,
    yearlyAmount: null,
    intendedFor: "14-day trial or limited free access",
    description: "Try Velico with limited access before upgrading.",
  },
  starter: {
    code: "starter",
    name: "Starter",
    monthlyAmount: 5000,
    yearlyAmount: 50000,
    intendedFor: "Solo business owners and very small businesses",
    description: "Core tools for solo business owners and very small businesses.",
  },
  growth: {
    code: "growth",
    name: "Growth",
    monthlyAmount: 12000,
    yearlyAmount: 120000,
    intendedFor: "Growing businesses with more staff and higher AI usage",
    description: "More staff access, higher AI usage, and stronger reporting.",
  },
  business: {
    code: "business",
    name: "Business",
    monthlyAmount: 30000,
    yearlyAmount: 300000,
    intendedFor: "Larger SMEs needing permissions, integrations, and priority support",
    description: "Permissions, integrations, and priority support for larger SMEs.",
  },
} as const;

export type PaystackPlanCode = keyof typeof paystackPlans;
export type PaidPlanCode = Exclude<PaystackPlanCode, "trial">;
export type BillingCycle = "monthly" | "yearly";

export function getPlanAmount(planCode: PaidPlanCode, billingCycle: BillingCycle) {
  const plan = paystackPlans[planCode];
  return billingCycle === "yearly" ? plan.yearlyAmount : plan.monthlyAmount;
}
