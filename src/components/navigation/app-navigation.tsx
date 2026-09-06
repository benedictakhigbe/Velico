"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VelicoMark } from "@/components/brand/velico-mark";
import { canUseRoute } from "@/lib/billing/plan-access";
import type { PaystackPlanCode } from "@/lib/billing/plans";
import { appNavItems } from "@/lib/velico/navigation";

type AppNavigationProps = {
  planCode: PaystackPlanCode;
};

export function AppNavigation({ planCode }: AppNavigationProps) {
  const pathname = usePathname();
  const visibleItems = appNavItems.filter((item) => canUseRoute(planCode, item.href));
  const groupedItems = visibleItems.reduce<Record<string, typeof visibleItems>>((groups, item) => {
    const group = item.group ?? "Workspace";
    groups[group] = groups[group] ?? [];
    groups[group].push(item);
    return groups;
  }, {});

  return (
    <nav className="grid gap-5 p-3">
      {Object.entries(groupedItems).map(([group, items]) => (
        <div key={group} className="grid gap-1">
          <p className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {group}
          </p>
          {items.map((item) => {
            const isActive =
              item.href === "/app" ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                data-velico-nav-active={isActive ? "true" : undefined}
                className="group flex min-h-10 items-center gap-3 rounded-[8px] px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--heading)] data-[velico-nav-active=true]:bg-[var(--brand-soft)] data-[velico-nav-active=true]:text-[var(--heading)] data-[velico-nav-active=true]:shadow-sm"
              >
                <item.icon
                  className="size-4 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--brand-blue)] group-data-[velico-nav-active=true]:text-[var(--brand-blue)]"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function MobileNavigationButton({ planCode }: AppNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="size-10 p-0 lg:hidden"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="size-5" />
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          />
          <div className="velico-mobile-drawer absolute inset-y-0 left-0 w-[min(20rem,calc(100vw-2rem))] border-r border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            <div className="flex h-16 items-center justify-between gap-3 border-b border-[var(--border)] px-5">
              <div className="flex items-center gap-3">
                <VelicoMark className="size-9" />
                <div>
                  <p className="text-base font-bold text-[var(--heading)]">Velico</p>
                  <p className="text-xs text-[var(--muted)]">Business workspace</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="size-10 p-0"
                aria-label="Close navigation"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div onClick={() => setIsOpen(false)}>
              <AppNavigation planCode={planCode} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
