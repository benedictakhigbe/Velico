import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { ExpenseForm } from "@/features/expenses/expense-form";
import { getExpensePageData } from "@/features/expenses/queries";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function ExpensesPage() {
  await requireRouteAccess("/app/expenses");

  const { rows, stats, isFallback, message } = await getExpensePageData();

  return (
    <ModulePage
      eyebrow="Spend tracking"
      title="Expenses"
      description="Capture vendors, categories, receipt uploads, recurring flags, and monthly expense analytics."
    >
      <div className="grid gap-6">
        {message ? (
          <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--muted)]">
            {message}
          </p>
        ) : null}
        <StatGrid stats={stats} />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Add expense">
            <ExpenseForm />
          </WorkingSection>
          <WorkingSection title={isFallback ? "Recent expenses demo" : "Recent expenses"}>
            <DataTable columns={["category", "vendor", "date", "amount"]} rows={rows} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
