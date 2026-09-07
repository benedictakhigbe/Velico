import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bot,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  PackageOpen,
  Receipt,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { canUseRoute } from "@/lib/billing/plan-access";
import type { PaystackPlanCode } from "@/lib/billing/plans";
import { quickActions } from "@/lib/velico/navigation";
import { recommendations } from "@/lib/velico/demo-data";

type DashboardOverviewProps = {
  ownerName: string;
  planCode: PaystackPlanCode;
};

const filters = ["Today", "Yesterday", "This week", "Last week", "This month", "Last month", "Custom date"];

const metrics = [
  { label: "Revenue", value: "₦118,500", detail: "Today", icon: CircleDollarSign },
  { label: "Expenses", value: "₦32,000", detail: "Today", icon: Receipt },
  { label: "Profit estimate", value: "₦41,500", detail: "Before tax and adjustments", icon: TrendingUp },
  { label: "Sales", value: "3", detail: "Completed transactions", icon: BarChart3 },
  { label: "Orders", value: "7", detail: "4 pending fulfilment", icon: ClipboardList },
  { label: "Customers", value: "3", detail: "2 repeat buyers", icon: Users },
  { label: "Average order value", value: "₦39,500", detail: "Today", icon: CircleDollarSign },
  { label: "Outstanding payments", value: "₦170,500", detail: "Needs follow-up", icon: AlertTriangle },
  { label: "Inventory status", value: "1 low", detail: "Hair Treatment Kit", icon: PackageOpen },
  { label: "Customer retention", value: "67%", detail: "Demo estimate", icon: Users },
];

const scoreCategories = [
  { label: "Sales", value: 91 },
  { label: "Profitability", value: 84 },
  { label: "Cash flow", value: 72 },
  { label: "Inventory", value: 89 },
  { label: "Operations", value: 81 },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

export function DashboardOverview({ ownerName, planCode }: DashboardOverviewProps) {
  const visibleQuickActions = quickActions.filter((action) => canUseRoute(planCode, action.href));
  const canAskAi = canUseRoute(planCode, "/app/ai");

  return (
    <div className="grid gap-6">
      <Card data-velico-animate className="overflow-hidden border-[var(--border-strong)]">
        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_0.8fr] lg:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              AI command center
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-normal text-[var(--heading)] sm:text-3xl">
              {getGreeting()}, {ownerName}
            </h1>
            <p className="mt-2 text-lg font-semibold text-[var(--heading)]">
              What would you like Velico to help you with today?
            </p>
            <form action={canAskAi ? "/app/ai" : "/app/billing"} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="sr-only" htmlFor="dashboard-ai-question">
                Ask Velico AI
              </label>
              <input
                id="dashboard-ai-question"
                name="question"
                className="h-12 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 text-base text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted)] hover:border-[var(--border-strong)] focus:border-[var(--brand-blue)]"
                placeholder="Ask about profit, stock, customers, expenses, or today's focus..."
                disabled={!canAskAi}
              />
              <button
                type="submit"
                data-velico-ripple
                className="relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-[8px] bg-[var(--brand-blue)] px-5 py-2 text-sm font-semibold leading-5 text-white shadow-sm transition hover:bg-[var(--brand-deep)] active:scale-[0.98]"
              >
                <Send className="size-4" aria-hidden="true" />
                {canAskAi ? "Ask Velico" : "Upgrade for AI"}
              </button>
            </form>
          </div>
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
              <p className="text-sm font-semibold text-[var(--heading)]">Filter view</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    index === 0
                      ? "h-9 rounded-[8px] bg-[var(--brand-blue)] px-3 text-xs font-semibold text-white"
                      : "h-9 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--heading)] hover:bg-[var(--brand-soft)]"
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <Card key={metric.label} data-velico-animate data-velico-hover className="p-4">
            <div className="flex items-center justify-between">
              <metric.icon className="size-5 text-[var(--brand-blue)]" aria-hidden="true" />
              <span className="rounded-[8px] bg-[var(--brand-soft)] px-2 py-1 text-xs font-medium text-[var(--heading)]">
                ₦
              </span>
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--heading)]">{metric.value}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">{metric.detail}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card data-velico-animate data-velico-hover className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[var(--heading)]">Velico Business Score</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Performance indicator, not financial advice.</p>
            </div>
            <div className="grid size-24 place-items-center rounded-full border-8 border-[var(--brand-soft)] bg-[var(--surface)]">
              <span className="text-2xl font-semibold text-[var(--brand-blue)]">82</span>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {scoreCategories.map((score) => (
              <div key={score.label}>
                <div className="flex justify-between text-xs font-semibold text-[var(--muted)]">
                  <span>{score.label}</span>
                  <span>{score.value}/100</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[var(--surface-muted)]">
                  <div
                    className="h-2 rounded-full bg-[var(--brand-blue)]"
                    style={{ width: `${score.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card data-velico-animate className="logo-gradient p-5 text-white">
          <div className="flex items-center gap-3">
            <Bot className="size-5 text-white" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Velico Morning Brief</h2>
          </div>
          <p className="mt-5 text-sm leading-6 text-white/85">
            Yesterday generated ₦482,000 revenue, ₦137,500 estimated profit, 53 orders, 18 new customers, and 4 failed deliveries.
          </p>
          <div className="mt-5 grid gap-2 text-sm">
            {["Restock Hair Treatment Kit.", "Review delivery expenses.", "Focus more on Premium Ankara Fabric."].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-[8px] border border-white/20 bg-white/12 px-3 py-2">
                <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
          <ButtonLink href={canAskAi ? "/app/ai" : "/app/billing?feature=%2Fapp%2Fai"} variant="secondary" className="mt-5 border-white/20 bg-white/12 text-white hover:bg-white/20">
            {canAskAi ? "Open today's brief" : "Upgrade for brief"}
          </ButtonLink>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card data-velico-animate className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-[var(--heading)]">Velico recommends</h2>
            <ButtonLink href={canAskAi ? "/app/ai" : "/app/billing?feature=%2Fapp%2Fai"} variant="secondary">
              {canAskAi ? "Ask why" : "Upgrade"}
            </ButtonLink>
          </div>
          <div className="mt-5 grid gap-3">
            {recommendations.map((recommendation) => (
              <div key={recommendation.signal} className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-[8px] bg-[var(--surface)] px-2 py-1 text-xs font-semibold text-[var(--brand-blue)]">
                    {recommendation.priority}
                  </span>
                  <p className="text-sm font-semibold text-[var(--heading)]">{recommendation.signal}</p>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{recommendation.data}</p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">{recommendation.action}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card data-velico-animate className="p-5">
          <h2 className="text-lg font-semibold text-[var(--heading)]">Quick actions</h2>
          <div className="mt-5 grid gap-3">
            {visibleQuickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                data-velico-hover
                className="velico-card flex h-16 items-center justify-between rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-4 text-sm font-semibold text-[var(--heading)] hover:border-[var(--brand-blue)] hover:bg-[var(--brand-soft)]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <action.icon className="size-5 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" />
                  <span className="truncate">{action.label}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
