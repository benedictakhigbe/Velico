import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Lock,
  PackageCheck,
  Receipt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { PublicHeader } from "@/components/navigation/public-header";
import { PublicFooter } from "@/components/navigation/public-footer";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Know your numbers instantly",
    description: "Track revenue, expenses, profit estimates, debt, and daily activity without spreadsheet sprawl.",
    icon: BarChart3,
  },
  {
    title: "Stay ahead of stock and debt",
    description: "Monitor reorder levels, inventory movement, overdue invoices, and customer balances.",
    icon: PackageCheck,
  },
  {
    title: "Ask for practical decisions",
    description: "Get plain-language guidance on what to restock, chase, pause, or promote next.",
    icon: Bot,
  },
  {
    title: "Built for mobile work",
    description: "Naira-first setup, responsive workflows, WhatsApp-ready reminders, and Paystack billing.",
    icon: Smartphone,
  },
];

const plans = [
  { name: "Starter", price: "NGN 5,000/mo", yearly: "NGN 50,000/yr", detail: "Core tools for solo business owners." },
  { name: "Growth", price: "NGN 12,000/mo", yearly: "NGN 120,000/yr", detail: "More staff access, AI usage, and reporting." },
  { name: "Business", price: "NGN 30,000/mo", yearly: "NGN 300,000/yr", detail: "Permissions, integrations, and priority support." },
];

const previewMetrics = [
  { label: "Sales today", value: "NGN 118.5K", icon: CircleDollarSign },
  { label: "Expenses", value: "NGN 32K", icon: Receipt },
  { label: "Customers owing", value: "3", icon: Users },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicHeader activePath="/" />

      <section className="velico-hero-scene relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 lg:min-h-[92svh] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-velico-animate className="relative z-10 py-10">
            <p className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--brand-blue)] shadow-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              AI business OS for Nigerian SMEs
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-[var(--heading)] sm:text-6xl lg:text-7xl">
              Velico
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Run sales, stock, customers, expenses, invoices, analytics, and useful AI guidance from one calm workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="h-12 px-6">
                Start Free
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary" className="h-12 px-6">
                See how it works
              </ButtonLink>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-[var(--foreground)] sm:grid-cols-3">
              {["14-day trial", "Naira-first", "Mobile friendly"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div data-velico-animate className="relative grid gap-4 sm:min-h-[520px]">
            <div className="velico-float-panel relative h-auto w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl sm:absolute sm:left-4 sm:top-4 sm:h-44 sm:w-64">
              <p className="text-sm font-semibold text-[var(--heading)]">Today</p>
              <p className="mt-4 text-3xl font-semibold text-[var(--brand-blue)]">NGN 1.84M</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Projected monthly revenue</p>
              <div className="mt-5 h-2 rounded-full bg-[var(--surface-muted)]">
                <div className="h-2 w-2/3 rounded-full bg-[var(--brand-blue)]" />
              </div>
            </div>

            <div className="velico-float-panel relative grid w-full gap-3 rounded-[8px] border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-4 shadow-2xl backdrop-blur sm:absolute sm:right-0 sm:top-24 sm:w-[min(100%,30rem)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--heading)]">Operations board</p>
                <span className="rounded-[8px] bg-[var(--brand-soft)] px-2 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                  Live
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {previewMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-3">
                    <metric.icon className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
                    <p className="mt-4 text-xs text-[var(--muted)]">{metric.label}</p>
                    <p className="mt-1 text-lg font-semibold text-[var(--heading)]">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                {["Follow up VEL-0002", "Restock Hair Treatment Kit", "Review logistics spend"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-3">
                    <span className="size-2 rounded-full bg-[var(--brand-blue)] velico-flow-line" />
                    <span className="text-sm font-medium text-[var(--foreground)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="velico-float-panel relative w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl sm:absolute sm:bottom-10 sm:left-0 sm:w-[min(100%,26rem)]">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-[var(--brand-soft)] text-[var(--brand-blue)]">
                  <Bot className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--heading)]">Velico copilot</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    Cash is healthy today. Your fastest win is collecting one overdue invoice before adding new stock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-[var(--border)] bg-[var(--surface)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-velico-animate className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              How it works
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--heading)] sm:text-3xl">
              Daily work becomes decisions you can act on
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} data-velico-animate data-velico-hover className="p-5">
                <feature.icon className="size-6 text-[var(--brand-blue)]" aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-[var(--heading)]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-velico-animate>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              Pricing
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--heading)] sm:text-3xl">
              Start lean, upgrade as your team grows
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Choose the tier that matches your operating rhythm. Paid plans unlock higher usage and team capacity.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} data-velico-animate data-velico-hover className="p-5">
                <h3 className="text-lg font-semibold text-[var(--heading)]">{plan.name}</h3>
                <p className="mt-3 text-2xl font-semibold text-[var(--brand-blue)]">{plan.price}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--heading)]">{plan.yearly}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{plan.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="logo-gradient py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            [ShieldCheck, "Rules-backed multi-tenancy", "Each organization owns its records with Firebase Auth and Firestore Security Rules."],
            [Lock, "Server-side secrets", "Service keys, AI calls, and payment verification stay off the client."],
            [FileText, "Reports that travel", "Statements, invoices, and analytics are structured for sharing and export."],
          ].map(([Icon, title, description]) => {
            const IconComponent = Icon as typeof ShieldCheck;
            return (
              <div key={String(title)} data-velico-animate>
                <IconComponent className="size-6 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85">{description as string}</p>
              </div>
            );
          })}
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
