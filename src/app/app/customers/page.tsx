import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { customers } from "@/lib/velico/demo-data";

export default async function CustomersPage() {
  await requireRouteAccess("/app/customers");

  return (
    <ModulePage
      eyebrow="CRM-lite"
      title="Customers"
      description="Keep customer contact details, purchase history, notes, tags, and outstanding balances."
    >
      <div className="grid gap-6">
        <StatGrid stats={[
          { label: "Customers", value: "3" },
          { label: "Outstanding balance", value: "NGN 170,500" },
          { label: "Repeat buyers", value: "2" },
          { label: "Statements ready", value: "3" },
        ]} />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Add customer">
            <form className="grid gap-4">
              <Field label="Customer name" name="name" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Field label="Tags" name="tags" placeholder="wholesale, VIP" />
              <Textarea label="Notes" name="notes" />
              <Button type="button">Save customer</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Customer list">
            <DataTable columns={["name", "phone", "balance", "lastPurchase"]} rows={customers} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
