import { redirect } from "next/navigation";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { completeOnboardingAction } from "@/features/onboarding/actions";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (organizationId) {
    redirect("/app");
  }

  return (
    <main className="velico-hero-scene min-h-screen px-4 py-8 sm:px-6">
      <section
        data-velico-animate
        className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
      >
        <div className="rounded-[8px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] p-6 shadow-xl backdrop-blur sm:p-8">
          <Link
            href="/login"
            className="mb-6 inline-flex h-10 items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-semibold text-[var(--heading)] transition hover:bg-[var(--surface-muted)]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to login
          </Link>
          <p className="inline-flex h-8 items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Workspace setup
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--heading)]">
            Tell Velico about your business
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            These details set your currency, dashboard defaults, reports, and invoice branding.
          </p>
          <div className="mt-8 grid gap-3">
            {["Naira-first reports", "Invoice-ready profile", "AI context for your workspace"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-3 text-sm font-semibold text-[var(--heading)]">
                <CheckCircle2 className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[8px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] p-6 shadow-xl backdrop-blur sm:p-8">
        {typeof params.message === "string" ? (
          <p className="mt-5 rounded-[8px] border border-[var(--danger)] bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]">
            {params.message}
          </p>
        ) : null}
        <form action={completeOnboardingAction} className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Business name" name="businessName" required className="sm:col-span-2" />
          <SelectField label="Business type" name="businessType" required defaultValue="retail">
            <option value="retail">Retail/shop</option>
            <option value="services">Service business</option>
            <option value="hybrid">Products and services</option>
            <option value="online">Online business</option>
            <option value="other">Other</option>
          </SelectField>
          <Field label="Industry" name="industry" placeholder="Fashion, pharmacy, salon" required />
          <Field label="Country" name="country" defaultValue="Nigeria" required />
          <SelectField label="Currency" name="currency" defaultValue="NGN" required>
            <option value="NGN">NGN - Nigerian Naira</option>
          </SelectField>
          <Field label="State" name="state" placeholder="Lagos" required />
          <Field label="City" name="city" placeholder="Ikeja, Lekki, Abuja..." required />
          <Field label="Phone" name="phone" type="tel" placeholder="+234..." required />
          <Field label="Number of staff" name="teamSize" type="number" min={1} defaultValue={1} required />
          <Field
            label="Products or services"
            name="productsOrServices"
            placeholder="Fashion items, skincare, agency services..."
            required
            className="sm:col-span-2"
          />
          <SelectField label="Monthly revenue range" name="monthlyRevenueRange" required defaultValue="under-500k">
            <option value="under-500k">Under ₦500,000</option>
            <option value="500k-2m">₦500,000 - ₦2,000,000</option>
            <option value="2m-10m">₦2,000,000 - ₦10,000,000</option>
            <option value="above-10m">Above ₦10,000,000</option>
          </SelectField>
          <SelectField label="Main sales channel" name="mainSalesChannel" required defaultValue="whatsapp">
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="website">Website</option>
            <option value="physical-shop">Physical shop</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
            <option value="marketplace">Marketplace</option>
            <option value="other">Other</option>
          </SelectField>
          <SelectField label="Main business goal" name="mainBusinessGoal" required defaultValue="increase-sales">
            <option value="increase-sales">Increase sales</option>
            <option value="increase-profit">Increase profit</option>
            <option value="reduce-expenses">Reduce expenses</option>
            <option value="get-more-customers">Get more customers</option>
            <option value="improve-retention">Improve customer retention</option>
            <option value="improve-inventory">Improve inventory</option>
            <option value="improve-staff">Improve staff performance</option>
            <option value="grow-online">Grow online</option>
          </SelectField>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full sm:w-auto">
              Create workspace
            </Button>
          </div>
        </form>
        </div>
      </section>
    </main>
  );
}
