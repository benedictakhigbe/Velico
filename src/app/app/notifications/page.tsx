import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { notifications } from "@/lib/velico/demo-data";

export default async function NotificationsPage() {
  await requireRouteAccess("/app/notifications");

  return (
    <ModulePage
      eyebrow="Alerts"
      title="Notifications"
      description="Low-stock, overdue invoice, subscription, and weekly-summary notifications will be managed here."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Unread", value: "3", detail: "Needs attention" },
            { label: "Low-stock alerts", value: "1", detail: "Inventory" },
            { label: "Invoice reminders", value: "1", detail: "Receivables" },
            { label: "AI briefings", value: "1", detail: "Weekly" },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
          <WorkingSection title="Preferences">
            <form className="grid gap-4">
              <SelectField label="Low-stock alerts" name="stockAlerts" defaultValue="enabled">
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </SelectField>
              <SelectField label="Invoice reminders" name="invoiceAlerts" defaultValue="enabled">
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </SelectField>
              <SelectField label="Weekly summary" name="weeklySummary" defaultValue="email">
                <option value="email">Email</option>
                <option value="in-app">In app only</option>
                <option value="disabled">Disabled</option>
              </SelectField>
              <Button type="button">Save preferences</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Recent notifications">
            <DataTable columns={["title", "type", "time"]} rows={notifications} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
