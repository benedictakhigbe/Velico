"use client";

import { CheckCircle2, CreditCard } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  getPlanAmount,
  paystackPlans,
  type BillingCycle,
  type PaidPlanCode,
} from "@/lib/billing/plans";

type PaystackCheckoutProps = {
  publicKey?: string;
  currentPlanCode: string;
  currentStatus: string;
};

const planFeatures: Record<PaidPlanCode, string[]> = {
  starter: [
    "Sales, orders, products, inventory, customers, expenses, finance, invoices, and reports",
    "Velico AI, notifications, and one workspace dashboard",
    "Best for owners who run the business themselves",
  ],
  growth: [
    "Everything in Starter",
    "Staff performance, team access, and automations",
    "Best for growing teams that need controlled operations",
  ],
  business: [
    "Everything in Growth",
    "Integrations, permissions, and priority support",
    "Best for larger SMEs that connect Velico to more tools",
  ],
};

export function PaystackCheckout({ publicKey, currentPlanCode, currentStatus }: PaystackCheckoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [pendingPlan, setPendingPlan] = useState<PaidPlanCode | null>(null);
  const [isVerifying, startVerifyTransition] = useTransition();

  const reference = searchParams.get("reference");
  const plans = useMemo(
    () => Object.values(paystackPlans).filter((plan) => plan.code !== "trial") as Array<(typeof paystackPlans)[PaidPlanCode]>,
    [],
  );
  const hasActiveSubscription = currentStatus.toLowerCase() === "active";

  useEffect(() => {
    if (!reference) {
      return;
    }

    startVerifyTransition(async () => {
      const response = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`);
      const payload = (await response.json().catch(() => null)) as { status?: string; error?: string } | null;

      if (!response.ok) {
        setMessage(payload?.error ?? "Could not verify this Paystack transaction yet.");
        return;
      }

      setMessage(payload?.status === "success" ? "Payment verified. Your subscription is active." : `Payment status: ${payload?.status ?? "pending"}.`);
      router.refresh();
    });
  }, [reference, router]);

  async function startCheckout(planCode: PaidPlanCode) {
    setPendingPlan(planCode);
    setMessage(null);

    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planCode, billingCycle }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { authorizationUrl?: string; error?: string }
        | null;

      if (!response.ok || !payload?.authorizationUrl) {
        throw new Error(payload?.error ?? "Paystack checkout could not start.");
      }

      window.location.assign(payload.authorizationUrl);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Paystack checkout could not start.");
      setPendingPlan(null);
    }
  }

  return (
    <div className="grid gap-4">
      {!publicKey ? (
        <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--muted)]">
          Add Paystack keys to enable live checkout.
        </p>
      ) : null}
      {message ? (
        <p className="rounded-[8px] border border-[var(--border-strong)] bg-[var(--brand-soft)] px-3 py-2 text-sm text-[var(--heading)]">
          {message}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-1">
        {(["monthly", "yearly"] as const).map((cycle) => (
          <button
            key={cycle}
            type="button"
            className={
              billingCycle === cycle
                ? "h-10 rounded-[8px] bg-[var(--surface)] text-sm font-semibold capitalize text-[var(--heading)] shadow-sm"
                : "h-10 rounded-[8px] text-sm font-semibold capitalize text-[var(--muted)]"
            }
            onClick={() => setBillingCycle(cycle)}
          >
            {cycle}
          </button>
        ))}
      </div>
      <div className="grid gap-3 xl:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.code}
            className={
              hasActiveSubscription && currentPlanCode === plan.code
                ? "rounded-[8px] border border-[var(--brand-blue)] bg-[var(--brand-soft)] p-4"
                : "rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4"
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-[var(--heading)]">{plan.name}</h3>
                  {hasActiveSubscription && currentPlanCode === plan.code ? (
                    <span className="inline-flex h-7 items-center gap-1 rounded-[8px] bg-[var(--surface)] px-2 text-xs font-semibold text-[var(--brand-blue)]">
                      <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      Active
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">{plan.description}</p>
                <p className="mt-3 text-xs font-medium uppercase text-[var(--muted)]">
                  {plan.intendedFor}
                </p>
              </div>
              <p className="text-right text-sm font-semibold text-[var(--heading)]">
                {`NGN ${getPlanAmount(plan.code, billingCycle).toLocaleString("en-NG")}`}
                <span className="block text-xs font-medium text-[var(--muted)]">
                  {billingCycle === "monthly" ? "per month" : "per year"}
                </span>
              </p>
            </div>
            <ul className="mt-5 grid gap-2 text-sm text-[var(--foreground)]">
              {planFeatures[plan.code].map((feature) => (
                <li key={feature} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              className="mt-5 w-full"
              variant={hasActiveSubscription && currentPlanCode === plan.code ? "secondary" : "primary"}
              disabled={Boolean(pendingPlan) || isVerifying || (hasActiveSubscription && currentPlanCode === plan.code)}
              onClick={() => startCheckout(plan.code)}
            >
              {hasActiveSubscription && currentPlanCode === plan.code ? (
                <CheckCircle2 className="size-4" aria-hidden="true" />
              ) : (
                <CreditCard className="size-4" aria-hidden="true" />
              )}
              {pendingPlan === plan.code
                ? "Opening Paystack..."
                : hasActiveSubscription && currentPlanCode === plan.code
                  ? "Current plan"
                  : "Pay with Paystack"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
