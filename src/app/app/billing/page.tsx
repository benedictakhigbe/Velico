import { Suspense } from "react";
import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { ButtonLink } from "@/components/ui/button";
import { PaystackCheckout } from "@/features/billing/paystack-checkout";
import { getBillingPageData } from "@/features/billing/queries";
import { getRouteAccessRule } from "@/lib/billing/plan-access";
import { paystackPlans } from "@/lib/billing/plans";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ feature?: string }>;
}) {
  const params = await searchParams;
  const { subscription, events, publicKey, isFallback, message } = await getBillingPageData();
  const requestedFeature = typeof params.feature === "string" ? getRouteAccessRule(params.feature) : null;
  const requiredPlan = requestedFeature ? paystackPlans[requestedFeature.minimumPlan] : null;

  return (
    <ModulePage
      eyebrow="Subscription"
      title="Billing"
      description="Paystack plans, usage quotas, invoices, billing events, and webhook-backed subscription status will live here."
    >
      <div className="grid gap-6">
        {requestedFeature && requiredPlan ? (
          <div
            data-velico-animate
            className="rounded-[8px] border border-[var(--brand-blue)] bg-[var(--brand-soft)] p-4"
          >
            <p className="text-sm font-semibold text-[var(--heading)]">
              {requestedFeature.featureName} is available on the {requiredPlan.name} plan and above.
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Choose a plan below. After Paystack confirms payment, Velico will only show and unlock the
              pages included in that active subscription.
            </p>
            <ButtonLink href="/app" variant="secondary" className="mt-4">
              Back to dashboard
            </ButtonLink>
          </div>
        ) : null}
        {message ? (
          <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--muted)]">
            {message}
          </p>
        ) : null}
        <StatGrid
          stats={[
            { label: "Current plan", value: subscription.planCode },
            { label: "Status", value: subscription.status },
            { label: "Provider", value: "Paystack" },
            { label: "Mode", value: publicKey ? "Live keys" : "Setup" },
          ]}
        />
        <WorkingSection title="Choose plan">
          <Suspense fallback={<p className="text-sm text-[var(--muted)]">Loading checkout...</p>}>
            <PaystackCheckout
              publicKey={publicKey}
              currentPlanCode={subscription.planCode}
              currentStatus={subscription.status}
            />
          </Suspense>
        </WorkingSection>
        <WorkingSection title={isFallback ? "Billing events setup" : "Billing events"}>
          {events.length > 0 ? (
            <DataTable columns={["reference", "plan", "status", "amount", "date"]} rows={events} />
          ) : (
            <div className="rounded-[8px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-5 text-sm text-[var(--muted)]">
              Paystack transactions and webhook updates will appear here.
            </div>
          )}
        </WorkingSection>
      </div>
    </ModulePage>
  );
}
