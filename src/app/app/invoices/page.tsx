import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { invoices } from "@/lib/velico/demo-data";

export default async function InvoicesPage() {
  await requireRouteAccess("/app/invoices");

  return (
    <ModulePage
      eyebrow="Receivables"
      title="Invoices"
      description="Create branded invoices, track payments, send email, and share payment reminders over WhatsApp."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Outstanding", value: "NGN 170,500", detail: "2 invoices awaiting payment" },
            { label: "Overdue", value: "NGN 42,000", detail: "Follow up this week" },
            { label: "Drafts", value: "1", detail: "Ready to review" },
            { label: "Paid this month", value: "NGN 320,000", detail: "Settled receivables" },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Create invoice">
            <form className="grid gap-4">
              <SelectField label="Customer" name="customer">
                <option>Kemi Stores</option>
                <option>Adaora Okeke</option>
                <option>Musa Bello</option>
              </SelectField>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Invoice date" name="invoiceDate" type="date" />
                <Field label="Due date" name="dueDate" type="date" />
                <Field label="Line item" name="lineItem" placeholder="Product or service" />
                <Field label="Amount" name="amount" placeholder="0.00" />
              </div>
              <Button type="button">Save invoice</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Invoice list">
            <DataTable columns={["number", "customer", "due", "total", "status"]} rows={invoices} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
