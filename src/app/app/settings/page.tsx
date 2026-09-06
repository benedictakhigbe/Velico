import { ModulePage } from "@/components/layout/module-page";
import { DataTable, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function SettingsPage() {
  await requireRouteAccess("/app/settings");

  return (
    <ModulePage
      eyebrow="Configuration"
      title="Settings"
      description="Manage business profile, currency, tax labels, invoice sequence, storage, and notification preferences."
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <WorkingSection title="Business profile">
          <form className="grid gap-4">
            <Field label="Business name" name="businessName" defaultValue="Velico Demo Store" />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Currency" name="currency" defaultValue="NGN">
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="GHS">GHS - Ghanaian Cedi</option>
                <option value="KES">KES - Kenyan Shilling</option>
                <option value="ZAR">ZAR - South African Rand</option>
              </SelectField>
              <Field label="Tax label" name="taxLabel" defaultValue="VAT" />
              <Field label="Invoice prefix" name="invoicePrefix" defaultValue="VEL" />
              <Field label="Next invoice number" name="nextInvoiceNumber" type="number" defaultValue={4} />
            </div>
            <Button type="button">Save settings</Button>
          </form>
        </WorkingSection>
        <WorkingSection title="Workspace controls">
          <DataTable
            columns={["setting", "value", "status"]}
            rows={[
              { setting: "Receipt branding", value: "Velico Demo Store", status: "Active" },
              { setting: "Cloud storage", value: "Firebase Storage", status: "Configured" },
              { setting: "Business timezone", value: "Africa/Lagos", status: "Active" },
              { setting: "Invoice sequence", value: "VEL-0004", status: "Ready" },
            ]}
          />
        </WorkingSection>
      </div>
    </ModulePage>
  );
}
