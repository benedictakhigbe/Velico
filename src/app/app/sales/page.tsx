import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { ButtonLink } from "@/components/ui/button";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function SalesPage() {
  await requireRouteAccess("/app/sales");

  return (
    <ModulePage
      eyebrow="POS-lite"
      title="Sales"
      description="Create sales, track payment methods, handle returns, and summarize each trading day."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Sales today", value: "NGN 118,500", detail: "3 completed transactions" },
            { label: "Average sale", value: "NGN 39,500", detail: "Across all channels" },
            { label: "Cash collected", value: "NGN 42,500", detail: "36% of today" },
            { label: "Transfer/POS", value: "NGN 76,000", detail: "64% of today" },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Start selling" description="Open the sale screen for line items and payment capture.">
            <div className="grid gap-3">
              <ButtonLink href="/app/sales/new">New sale</ButtonLink>
              <ButtonLink href="/app/products" variant="secondary">
                Manage products
              </ButtonLink>
            </div>
          </WorkingSection>
          <WorkingSection title="Recent sales">
            <DataTable
              columns={["receipt", "customer", "items", "method", "total"]}
              rows={[
                { receipt: "VEL-S-003", customer: "Walk-in", items: 2, method: "Transfer", total: "NGN 76,000" },
                { receipt: "VEL-S-002", customer: "Adaora Okeke", items: 1, method: "Cash", total: "NGN 24,000" },
                { receipt: "VEL-S-001", customer: "Musa Bello", items: 3, method: "POS", total: "NGN 18,500" },
              ]}
            />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
