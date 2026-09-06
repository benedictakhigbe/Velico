import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function InventoryPage() {
  await requireRouteAccess("/app/inventory");

  return (
    <ModulePage
      eyebrow="Stock control"
      title="Inventory"
      description="Track stock in/out adjustments, reorder levels, low-stock alerts, and inventory movement history."
    >
      <div className="grid gap-6">
        <StatGrid stats={[
          { label: "Stock movements today", value: "8" },
          { label: "Stock-in value", value: "NGN 420,000" },
          { label: "Stock-out value", value: "NGN 118,500" },
          { label: "Items below reorder", value: "1" },
        ]} />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Stock adjustment">
            <form className="grid gap-4">
              <SelectField label="Product" name="product">
                <option>Hair Treatment Kit</option>
                <option>Premium Ankara Fabric</option>
              </SelectField>
              <SelectField label="Movement" name="movement">
                <option>Stock in</option>
                <option>Stock out</option>
                <option>Adjustment</option>
              </SelectField>
              <Field label="Quantity" name="quantity" type="number" placeholder="0" />
              <Field label="Reason" name="reason" placeholder="Supplier delivery, damaged item" />
              <Button type="button">Record movement</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Recent movement history">
            <DataTable columns={["product", "type", "quantity", "reason", "time"]} rows={[
              { product: "Hair Treatment Kit", type: "Stock out", quantity: "4", reason: "Sale", time: "Today" },
              { product: "Premium Ankara Fabric", type: "Stock in", quantity: "20", reason: "Supplier delivery", time: "Yesterday" },
              { product: "Hair Treatment Kit", type: "Adjustment", quantity: "-1", reason: "Damaged pack", time: "Aug 28" },
            ]} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
