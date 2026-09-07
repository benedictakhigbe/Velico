import Link from "next/link";
import { PublicFooter } from "@/components/navigation/public-footer";
import { PublicHeader } from "@/components/navigation/public-header";
import { Card } from "@/components/ui/card";

type LegalSection = {
  title: string;
  body: Array<string>;
};

type LegalPageProps = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: Array<LegalSection>;
  children?: React.ReactNode;
};

export function LegalPage({ title, eyebrow, intro, sections, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicHeader backHref="/" backLabel="Home" />
      <section className="px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <article className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[var(--heading)] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{intro}</p>
            <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
              Last updated: September 7, 2026
            </p>

            <div className="mt-8 grid gap-4">
              {sections.map((section) => (
                <Card key={section.title} className="p-5 sm:p-6">
                  <h2 className="text-xl font-semibold text-[var(--heading)]">{section.title}</h2>
                  <div className="mt-3 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Card>
              ))}
              {children}
            </div>
          </article>

          <aside className="lg:sticky lg:top-24">
            <Card className="p-5">
              <h2 className="text-base font-semibold text-[var(--heading)]">Legal pages</h2>
              <nav className="mt-4 grid gap-2 text-sm font-medium text-[var(--muted)]">
                <Link className="hover:text-[var(--brand-blue)]" href="/terms">
                  Terms and Conditions
                </Link>
                <Link className="hover:text-[var(--brand-blue)]" href="/privacy">
                  Privacy Policy
                </Link>
                <Link className="hover:text-[var(--brand-blue)]" href="/cookies">
                  Cookies Policy
                </Link>
                <Link className="hover:text-[var(--brand-blue)]" href="/data-privacy-law">
                  Data Privacy Law
                </Link>
              </nav>
            </Card>
          </aside>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
