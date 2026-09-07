import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PublicHeader } from "@/components/navigation/public-header";
import { PublicFooter } from "@/components/navigation/public-footer";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { paystackPlans } from "@/lib/billing/plans";

const planFeatures = {
  starter: ["Sales, products, expenses, and invoices", "Basic reports", "Starter AI guidance"],
  growth: ["Everything in Starter", "Team access", "Higher AI usage and better reporting"],
  business: ["Everything in Growth", "Permissions and integrations", "Priority support"],
} as const;

export default function PricingPage() {
  const plans = [paystackPlans.starter, paystackPlans.growth, paystackPlans.business];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicHeader activePath="/pricing" backHref="/" backLabel="Home" />

      <section className="velico-hero-scene px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div data-velico-animate className="max-w-2xl">
            <p className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--brand-blue)] shadow-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              Simple business pricing
            </p>
            <h1 className="mt-6 text-3xl font-semibold text-[var(--heading)] sm:text-5xl lg:text-6xl">
              Pick the plan that matches your stage
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              Start small, then upgrade when your team, reporting, and AI usage need more room.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.code} data-velico-animate data-velico-hover className="p-6">
                <h2 className="text-xl font-semibold text-[var(--heading)]">{plan.name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted)]">{plan.description}</p>
                <p className="mt-6 text-3xl font-semibold text-[var(--brand-blue)]">
                  NGN {plan.monthlyAmount.toLocaleString("en-NG")}
                  <span className="text-sm font-medium text-[var(--muted)]">/mo</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                  NGN {plan.yearlyAmount?.toLocaleString("en-NG")}/yr
                </p>
                <ul className="mt-6 grid gap-3 text-sm text-[var(--foreground)]">
                  {planFeatures[plan.code].map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/signup" className="mt-6 w-full">
                  Choose {plan.name}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
