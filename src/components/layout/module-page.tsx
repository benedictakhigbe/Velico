import { Sparkles } from "lucide-react";
import { BackButton } from "@/components/navigation/back-button";
import { Card } from "@/components/ui/card";

type ModulePageProps = {
  title: string;
  eyebrow: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  framed?: boolean;
  children?: React.ReactNode;
};

export function ModulePage({
  title,
  eyebrow,
  description,
  backHref,
  backLabel = "Back",
  actions,
  framed = true,
  children,
}: ModulePageProps) {
  return (
    <div className="grid gap-6">
      <div data-velico-animate className="grid min-w-0 gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="min-w-0">
          {backHref ? (
            <BackButton fallbackHref={backHref} label={backLabel} className="mb-4" />
          ) : null}
          <p className="inline-flex min-h-8 max-w-full items-center gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)] shadow-sm">
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span className="min-w-0 break-words">{eyebrow}</span>
          </p>
          <h1 className="mt-3 break-words text-2xl font-semibold text-[var(--heading)] sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
        </div>
        {actions ? <div className="grid min-w-0 gap-2 sm:flex sm:flex-wrap">{actions}</div> : null}
      </div>
      {framed ? (
        <Card data-velico-animate className="min-w-0 p-4 sm:p-6">
          {children ?? (
            <div className="rounded-[8px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-8 text-sm text-[var(--muted)]">
              This module shell is ready for the next implementation milestone.
            </div>
          )}
        </Card>
      ) : (
        children ?? (
          <div
            data-velico-animate
            className="rounded-[8px] border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-8 text-sm text-[var(--muted)]"
          >
            This module shell is ready for the next implementation milestone.
          </div>
        )
      )}
    </div>
  );
}
