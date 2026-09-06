import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { automationRules } from "@/lib/velico/demo-data";

export default async function AutomationsPage() {
  await requireRouteAccess("/app/automations");

  return (
    <ModulePage
      eyebrow="Rule-based workflows"
      title="Automations"
      description="Create practical rules for low stock, inactive customers, overdue payments, sales drops, and expense thresholds."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Active rules", value: "2", detail: "Notifications and follow-ups" },
            { label: "Draft rules", value: "1", detail: "Expense threshold" },
            { label: "Channels", value: "3 planned", detail: "WhatsApp, SMS, Email" },
            { label: "AI actions", value: "Ready", detail: "Recommendations can be generated" },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Create rule">
            <form className="grid gap-4">
              <SelectField label="When" name="when" defaultValue="stock-low">
                <option value="stock-low">Stock is low</option>
                <option value="customer-inactive">Customer has not purchased</option>
                <option value="order-pending">Order stays pending too long</option>
                <option value="expense-threshold">Expenses exceed a threshold</option>
                <option value="payment-overdue">Payment becomes overdue</option>
              </SelectField>
              <SelectField label="Then" name="then" defaultValue="notification">
                <option value="notification">Create notification</option>
                <option value="task">Add follow-up task</option>
                <option value="flag">Flag the record</option>
                <option value="recommendation">Generate AI recommendation</option>
              </SelectField>
              <Field label="Threshold or timing" name="threshold" placeholder="e.g. 7 days, ₦100,000, reorder level" />
              <Button type="button">Save automation</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Automation rules">
            <DataTable columns={["rule", "when", "then", "status"]} rows={automationRules} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
