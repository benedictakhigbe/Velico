import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function ReportsPage() {
  await requireRouteAccess("/app/reports");

  return (
    <ModulePage
      eyebrow="Analytics"
      title="Reports"
      description="Analyze revenue, profit estimates, expenses, stock movement, customer balances, and exports."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Gross revenue", value: "NGN 1.42M", detail: "Month to date" },
            { label: "Estimated profit", value: "NGN 486K", detail: "After logged costs" },
            { label: "Expense ratio", value: "28%", detail: "Within target range" },
            { label: "Cash gap", value: "NGN 170.5K", detail: "Open receivables" },
          ]}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <WorkingSection title="Report queue">
            <DataTable
              columns={["report", "period", "status", "owner"]}
              rows={[
                { report: "Sales summary", period: "This month", status: "Ready", owner: "Velico" },
                { report: "Expense breakdown", period: "This month", status: "Ready", owner: "Velico" },
                { report: "Inventory valuation", period: "Current", status: "Review", owner: "Operations" },
              ]}
            />
          </WorkingSection>
          <WorkingSection title="Key insights">
            <div className="grid gap-3 text-sm text-[var(--foreground)]">
              <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                Beauty products are the only category below reorder level.
              </p>
              <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                Two invoices make up the current receivables balance.
              </p>
              <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                Logistics and rent are the largest logged expense categories this month.
              </p>
            </div>
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
