import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VelicoMark } from "@/components/brand/velico-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button";

type PublicHeaderProps = {
  activePath?: "/" | "/how-it-works" | "/pricing";
  backHref?: string;
  backLabel?: string;
};

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/login", label: "Login" },
] as const;

export function PublicHeader({ activePath, backHref, backLabel = "Back" }: PublicHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--heading)] transition hover:bg-[var(--surface-muted)] sm:w-auto sm:px-3"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{backLabel}</span>
            </Link>
          ) : null}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <VelicoMark />
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-[var(--heading)]">Velico</p>
              <p className="hidden text-xs text-[var(--muted)] sm:block">Run smarter. Grow with clarity.</p>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              className={
                activePath === link.href
                  ? "text-[var(--brand-blue)]"
                  : "transition hover:text-[var(--brand-blue)]"
              }
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/signup" className="whitespace-nowrap px-3 sm:px-4">Start Free</ButtonLink>
        </div>
      </div>
    </header>
  );
}
