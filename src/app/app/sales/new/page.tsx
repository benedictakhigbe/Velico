import { ModulePage } from "@/components/layout/module-page";
import { WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function NewSalePage() {
  await requireRouteAccess("/app/sales/new");

  return (
    <ModulePage
      eyebrow="Fast sale"
      title="New Sale"
      description="The next milestone will add line items, discounts, taxes, payments, receipts, and atomic stock reduction."
      backHref="/app/sales"
      backLabel="Back to sales"
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <WorkingSection title="Sale details">
          <form className="grid gap-4">
            <SelectField label="Customer" name="customer" defaultValue="walk-in">
              <option value="walk-in">Walk-in customer</option>
              <option value="adaora">Adaora Okeke</option>
              <option value="musa">Musa Bello</option>
              <option value="kemi">Kemi Stores</option>
            </SelectField>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Product" name="product" defaultValue="ankara">
                <option value="ankara">Premium Ankara Fabric</option>
                <option value="hair-kit">Hair Treatment Kit</option>
                <option value="delivery">Delivery Service</option>
              </SelectField>
              <Field label="Quantity" name="quantity" type="number" min={1} defaultValue={1} />
              <Field label="Discount" name="discount" placeholder="0.00" />
              <SelectField label="Payment method" name="paymentMethod" defaultValue="transfer">
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
                <option value="pos">POS</option>
                <option value="split">Split payment</option>
              </SelectField>
            </div>
            <Button type="button">Complete sale</Button>
          </form>
        </WorkingSection>
        <WorkingSection title="Receipt preview">
          <div className="grid gap-3 rounded-[8px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span className="font-semibold text-[var(--heading)]">NGN 18,500</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[var(--muted)]">Discount</span>
              <span className="font-semibold text-[var(--heading)]">NGN 0</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[var(--border)] pt-3">
              <span className="text-[var(--muted)]">Total due</span>
              <span className="text-lg font-semibold text-[var(--heading)]">NGN 18,500</span>
            </div>
          </div>
        </WorkingSection>
      </div>
    </ModulePage>
  );
}
