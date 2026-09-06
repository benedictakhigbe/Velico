import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VelicoMark } from "@/components/brand/velico-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type AuthCardProps = {
  title: string;
  subtitle: string;
  message?: string;
  backHref?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthCard({ title, subtitle, message, backHref, children, footer }: AuthCardProps) {
  return (
    <main className="velico-hero-scene grid min-h-screen place-items-center px-4 py-10">
      <section
        data-velico-animate
        data-velico-hover
        className="velico-card w-full max-w-md rounded-[8px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] p-6 shadow-xl backdrop-blur sm:p-8"
      >
        {backHref ? (
          <Link
            href={backHref}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--brand-blue)]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Link>
        ) : null}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <VelicoMark />
            <span className="text-xl font-bold text-[var(--heading)]">Velico</span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="mb-6 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <h1 className="text-2xl font-semibold tracking-normal text-[var(--heading)]">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{subtitle}</p>
        </div>
        {message ? (
          <p className="mb-4 rounded-[8px] border border-[var(--border-strong)] bg-[var(--brand-soft)] px-3 py-2 text-sm text-[var(--heading)]">
            {message}
          </p>
        ) : null}
        {children}
        <div className="mt-6 text-center text-sm text-[var(--muted)]">{footer}</div>
      </section>
    </main>
  );
}
