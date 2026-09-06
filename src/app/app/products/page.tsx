import { ModulePage } from "@/components/layout/module-page";
import { DataTable, StatGrid, WorkingSection } from "@/components/layout/working-section";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { requireRouteAccess } from "@/lib/billing/subscription-access";
import { products } from "@/lib/velico/demo-data";

export default async function ProductsPage() {
  await requireRouteAccess("/app/products");

  return (
    <ModulePage
      eyebrow="Catalogue"
      title="Products and services"
      description="Manage SKU, category, cost price, selling price, tax, barcode, and stock tracking settings."
    >
      <div className="grid gap-6">
        <StatGrid stats={[
          { label: "Active items", value: "3", detail: "2 stock-tracked products, 1 service" },
          { label: "Inventory value", value: "NGN 165,000", detail: "Estimated from cost price" },
          { label: "Low stock", value: "1", detail: "Needs reorder attention" },
          { label: "Categories", value: "3", detail: "Fashion, Beauty, Service" },
        ]} />
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <WorkingSection title="Add item" description="Create a product or service for sales and invoices.">
            <form className="grid gap-4">
              <Field label="Item name" name="name" placeholder="e.g. Premium Ankara Fabric" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="SKU" name="sku" placeholder="ANK-001" />
                <SelectField label="Type" name="type" defaultValue="product">
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </SelectField>
                <Field label="Cost price" name="costPrice" placeholder="0.00" />
                <Field label="Selling price" name="sellingPrice" placeholder="0.00" />
                <Field label="Stock quantity" name="stockQuantity" placeholder="0" />
                <Field label="Reorder level" name="reorderLevel" placeholder="0" />
              </div>
              <Button type="button">Save product</Button>
            </form>
          </WorkingSection>
          <WorkingSection title="Catalogue">
            <DataTable
              columns={["name", "sku", "category", "stock", "reorder", "price", "status"]}
              rows={products}
            />
          </WorkingSection>
        </div>
      </div>
    </ModulePage>
  );
}
