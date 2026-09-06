import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { staffPerformance } from "@/lib/velico/demo-data";

export default async function StaffPage() {
  await requireRouteAccess("/app/staff");

  return (
    <ModulePage
      eyebrow="Staff performance"
      title="Staff"
      description="Compare orders handled, revenue generated, conversion rate, and fulfilment quality for your team."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Active staff", value: "2", detail: "Owner and accountant" },
            { label: "Orders handled", value: "29", detail: "This month" },
            { label: "Revenue generated", value: "₦838,000", detail: "Tracked staff sales" },
            { label: "Best conversion", value: "72%", detail: "Demo Owner" },
          ]}
        />
        <WorkingSection
          title="Performance comparison"
          description="Use this to spot coaching needs, strong performers, and fulfilment bottlenecks."
        >
          <DataTable columns={["name", "orders", "revenue", "conversion", "status"]} rows={staffPerformance} />
        </WorkingSection>
      </div>
    </ModulePage>
  );
}
