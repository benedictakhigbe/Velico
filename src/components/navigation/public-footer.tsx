import Link from "next/link";
import { VelicoMark } from "@/components/brand/velico-mark";

const links = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/data-privacy-law", label: "Data law" },
  { href: "/task-calculator", label: "Task calculator" },
] as const;

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <VelicoMark className="size-9" />
          <span className="text-sm font-semibold text-[var(--heading)]">Velico</span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[var(--muted)]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--brand-blue)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
