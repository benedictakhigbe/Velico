import { redirect } from "next/navigation";
import { Activity, Bot, LogOut, Package, Receipt, ShoppingCart, Sparkles, WalletCards } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { VelicoMark } from "@/components/brand/velico-mark";
import { AppNavigation, MobileNavigationButton } from "@/components/navigation/app-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { signOutAction } from "@/features/auth/actions";
import { canUseRoute } from "@/lib/billing/plan-access";
import { getCurrentPlanForOrganization } from "@/lib/billing/subscription-access";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";

type AppShellProps = {
  children: React.ReactNode;
};

export async function AppShell({ children }: AppShellProps) {
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    redirect("/app/onboarding");
  }

  const planCode = await getCurrentPlanForOrganization(organizationId);
  const showNewSale = canUseRoute(planCode, "/app/sales/new");
  const showAi = canUseRoute(planCode, "/app/ai");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-y-auto border-r border-[var(--border)] bg-[var(--surface)] lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-[var(--border)] px-5">
          <VelicoMark className="size-9" />
          <div>
            <p className="text-base font-bold text-[var(--heading)]">Velico</p>
            <p className="text-xs text-[var(--muted)]">Run smarter. Grow with clarity.</p>
          </div>
        </div>
        <div className="flex-1">
          <AppNavigation planCode={planCode} />
        </div>
        <div className="mx-3 mb-4 mt-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--heading)]">
            <Sparkles className="size-4 text-[var(--brand-blue)]" aria-hidden="true" />
            Velico copilot
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
            Watching sales, stock, invoices, and expenses for your next useful action.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-[var(--brand-blue)]">
            <Activity className="size-3.5" aria-hidden="true" />
            Ready
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface)]" aria-hidden="true">
            <div className="h-full w-3/4 rounded-full bg-[var(--brand-blue)] velico-flow-line" />
          </div>
        </div>
      </aside>
      <div className="min-w-0 lg:pl-72">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-2 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] px-3 py-3 backdrop-blur sm:gap-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <MobileNavigationButton planCode={planCode} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--heading)]">Business workspace</p>
              <p className="truncate text-xs text-[var(--muted)]">{user.email}</p>
            </div>
          </div>
          <div className="hidden min-w-0 items-center gap-2 md:flex">
            {showNewSale ? (
              <ButtonLink href="/app/sales/new" variant="secondary">
                <ShoppingCart className="size-4" aria-hidden="true" />
                New sale
              </ButtonLink>
            ) : null}
            {showAi ? (
              <ButtonLink href="/app/ai" variant="secondary">
                <Bot className="size-4" aria-hidden="true" />
                Ask AI
              </ButtonLink>
            ) : null}
            <span className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-xs font-semibold capitalize text-[var(--heading)]">
              {planCode} plan
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <form action={signOutAction}>
              <Button variant="secondary" type="submit">
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </form>
          </div>
        </header>
        <div className="border-b border-[var(--border)] bg-[var(--surface)]/70 px-3 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 gap-2 overflow-x-auto">
            {showNewSale ? (
              <ButtonLink href="/app/sales/new" variant="secondary" className="h-10 shrink-0">
                <ShoppingCart className="size-4" aria-hidden="true" />
                New sale
              </ButtonLink>
            ) : null}
            <ButtonLink href="/app/expenses" variant="secondary" className="h-10 shrink-0">
              <WalletCards className="size-4" aria-hidden="true" />
              Expense
            </ButtonLink>
            <ButtonLink href="/app/products" variant="secondary" className="h-10 shrink-0">
              <Package className="size-4" aria-hidden="true" />
              Product
            </ButtonLink>
            <ButtonLink href="/app/invoices" variant="secondary" className="h-10 shrink-0">
              <Receipt className="size-4" aria-hidden="true" />
              Invoice
            </ButtonLink>
            {showAi ? (
              <ButtonLink href="/app/ai" variant="secondary" className="h-10 shrink-0">
                <Bot className="size-4" aria-hidden="true" />
                Ask AI
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <main className="min-w-0 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
