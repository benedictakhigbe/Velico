import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { financeRows } from "@/lib/velico/demo-data";

export default async function FinancePage() {
  await requireRouteAccess("/app/finance");

  return (
    <ModulePage
      eyebrow="Nigerian SME finance"
      title="Finance"
      description="Track revenue, expenses, profit estimates, payment gaps, and monthly comparisons in Naira."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Revenue", value: "₦1,420,000", detail: "This month" },
            { label: "Expenses", value: "₦300,500", detail: "Logistics, rent, electricity, data" },
            { label: "Profit estimate", value: "₦486,000", detail: "Before tax and adjustments" },
            { label: "Outstanding payments", value: "₦170,500", detail: "Needs follow-up" },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <WorkingSection
            title="Financial snapshot"
            description="Velico keeps this as an operating view, not accounting or tax advice."
          >
            <DataTable columns={["metric", "period", "value", "status"]} rows={financeRows} />
          </WorkingSection>
          <WorkingSection title="Expense categories">
            <div className="grid gap-2 text-sm">
              {["Logistics", "Fuel", "Electricity", "Internet/Data", "Salaries", "Rent", "Advertising", "Packaging", "Stock purchases", "Bank charges"].map((category) => (
                <div key={category} className="flex items-center justify-between rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2">
                  <span className="font-medium text-[var(--heading)]">{category}</span>
                  <span className="text-xs font-semibold text-[var(--brand-blue)]">NGN</span>
                </div>
              ))}
            </div>
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
