import {
  ArrowRight,
  Banknote,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardList,
  FileText,
  PackageCheck,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { PublicHeader } from "@/components/navigation/public-header";
import { PublicFooter } from "@/components/navigation/public-footer";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const workflow = [
  {
    step: "01",
    title: "Set up your workspace",
    description:
      "Add your business profile, currency, team size, and operating defaults once. Velico shapes the workspace around your business.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Run daily operations",
    description:
      "Record sales, expenses, products, stock movement, invoices, customer balances, and payment activity from one dashboard.",
    icon: Banknote,
  },
  {
    step: "03",
    title: "Let Velico connect the dots",
    description:
      "The system watches how cash, stock, invoices, and customers move together so your reports stay useful and current.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Ask what to do next",
    description:
      "Velico AI turns your records into practical next actions, from debt follow-up to restock decisions and expense reviews.",
    icon: Bot,
  },
];

const operatingModules = [
  { label: "Sales", value: "NGN 118.5K", detail: "3 transactions today", icon: Banknote },
  { label: "Products", value: "3 active", detail: "1 item needs reorder", icon: PackageCheck },
  { label: "Customers", value: "NGN 170.5K", detail: "Outstanding balance", icon: Users },
  { label: "Expenses", value: "NGN 300.5K", detail: "Month to date", icon: WalletCards },
  { label: "Invoices", value: "2 open", detail: "1 overdue", icon: Receipt },
  { label: "Reports", value: "Ready", detail: "Sales and expense summaries", icon: FileText },
];

const insights = [
  "Collect VEL-0002 before ordering new inventory.",
  "Hair Treatment Kit is below reorder level.",
  "Logistics cost rose against average sale value.",
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicHeader activePath="/how-it-works" backHref="/" backLabel="Home" />

      <section className="velico-hero-scene relative isolate overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:min-h-[86svh] lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div data-velico-animate className="relative z-10 py-10">
            <p className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--brand-blue)] shadow-sm">
              <Sparkles className="size-4" aria-hidden="true" />
              From daily entries to clear decisions
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-[var(--heading)] sm:text-6xl lg:text-7xl">
              How Velico works
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Velico turns everyday business activity into a living operations map: what happened, what changed, what needs attention, and what to do next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="h-12 px-6">
                Start Free
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/app" variant="secondary" className="h-12 px-6">
                Open workspace
              </ButtonLink>
            </div>
          </div>

          <div data-velico-animate className="relative grid gap-4 sm:min-h-[620px]">
            <div className="relative mx-auto h-auto w-full rounded-[8px] border border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-4 shadow-2xl backdrop-blur sm:absolute sm:inset-x-0 sm:top-10 sm:h-[30rem] sm:w-[min(100%,46rem)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--heading)]">Velico command view</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">Live operating picture</p>
                </div>
                <span className="rounded-[8px] bg-[var(--brand-soft)] px-2 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                  Synced
                </span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {operatingModules.slice(0, 3).map((module) => (
                  <div key={module.label} className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-3">
                    <module.icon className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
                    <p className="mt-4 text-xs text-[var(--muted)]">{module.label}</p>
                    <p className="mt-1 text-lg font-semibold text-[var(--heading)]">{module.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-[1fr_0.86fr]">
                <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[var(--heading)]">Cash flow path</p>
                    <p className="text-xs font-medium text-[var(--brand-blue)]">Today</p>
                  </div>
                  <div className="mt-6 flex h-32 items-end gap-2">
                    {[44, 72, 58, 90, 64, 78, 100, 84].map((height, index) => (
                      <span
                        key={`${height}-${index}`}
                        className="flex-1 rounded-t-[8px] bg-[var(--brand-blue)] opacity-80 velico-meter-bar"
                        style={{ height: `${height}%`, animationDelay: `${index * 90}ms` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="text-sm font-semibold text-[var(--heading)]">AI next actions</p>
                  <div className="mt-4 grid gap-2">
                    {insights.map((insight) => (
                      <div key={insight} className="flex items-start gap-2 rounded-[8px] bg-[var(--surface-muted)] px-3 py-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" />
                        <p className="text-sm leading-5 text-[var(--foreground)]">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="velico-float-panel relative w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl sm:absolute sm:bottom-6 sm:left-0 sm:w-[min(88%,20rem)]">
              <p className="text-sm font-semibold text-[var(--heading)]">Decision made simpler</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Your dashboard moves from record keeping to decision support as each module fills with data.
              </p>
            </div>
            <div className="velico-float-panel relative w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl sm:absolute sm:right-0 sm:top-0 sm:w-[min(82%,18rem)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[var(--brand-blue)]" aria-hidden="true" />
                <p className="text-sm font-semibold text-[var(--heading)]">Workspace scoped</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Team members only see the organization records they are allowed to access.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div data-velico-animate className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              The workflow
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--heading)] sm:text-3xl">
              Four stages, one operating rhythm
            </h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {workflow.map((item) => (
              <Card key={item.step} data-velico-animate data-velico-hover className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-[var(--brand-blue)]">{item.step}</span>
                  <item.icon className="size-5 text-[var(--brand-blue)]" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-[var(--heading)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div data-velico-animate>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              What connects
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[var(--heading)] sm:text-3xl">
              Every module feeds the same business picture
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Sales affect stock. Expenses affect profit. Invoices affect cash. Customer balances affect your next follow-up. Velico keeps those relationships visible.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {operatingModules.map((module) => (
              <Card key={module.label} data-velico-animate data-velico-hover className="p-5">
                <module.icon className="size-5 text-[var(--brand-blue)]" aria-hidden="true" />
                <p className="mt-5 text-sm text-[var(--muted)]">{module.label}</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--heading)]">{module.value}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{module.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="logo-gradient px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div data-velico-animate>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">
              The outcome
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Velico helps the owner spend less time hunting for answers.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/85">
              The experience is designed around repeat daily use: fast entries, clear alerts, useful summaries, and a workspace that tells you where attention should go.
            </p>
          </div>
          <div data-velico-animate className="rounded-[8px] border border-white/20 bg-white/12 p-5 backdrop-blur">
            {["Record faster", "Review smarter", "Act sooner"].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-white/15 py-4 last:border-b-0">
                <CheckCircle2 className="size-5 shrink-0 text-white" aria-hidden="true" />
                <span className="text-lg font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
