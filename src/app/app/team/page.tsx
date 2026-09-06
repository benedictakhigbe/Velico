import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { team } from "@/lib/velico/demo-data";

export default async function TeamPage() {
  await requireRouteAccess("/app/team");

  return (
    <ModulePage
      eyebrow="Access control"
      title="Team and permissions"
      description="Invite staff, assign roles, deactivate access, and audit important account actions."
    >
      <div className="grid gap-6">
        <StatGrid
          stats={[
            { label: "Active users", value: "2", detail: "Owner and accountant" },
            { label: "Pending invites", value: "1", detail: "Sales desk" },
            { label: "Roles", value: "3", detail: "Owner, staff, accountant" },
            { label: "Audit events", value: "12", detail: "Last 30 days" },
          ]}
        />
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <WorkingSection title="Invite teammate">
            <form className="grid gap-4">
              <Field label="Email address" name="email" type="email" placeholder="staff@example.com" />
              <SelectField label="Role" name="role" defaultValue="sales">
                <option value="sales">Sales staff</option>
                <option value="accountant">Accountant</option>
                <option value="manager">Manager</option>
              </SelectField>
              <Button type="button">Send invite</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Team members">
            <DataTable columns={["name", "email", "role", "status"]} rows={team} />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
