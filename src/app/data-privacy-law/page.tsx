import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { LegalPage } from "@/components/legal/legal-page";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Data Privacy Law",
  description: "A plain-language data privacy law overview for Velico.",
};

const sections = [
  {
    title: "Nigeria NDPA",
    body: [
      "Velico is built for Nigerian SMEs, so the Nigeria Data Protection Act, 2023 is a key compliance reference. The NDPA regulates processing of personal data and is enforced by the Nigeria Data Protection Commission.",
      "A practical Velico launch checklist should include a privacy notice, lawful basis mapping, vendor review, security controls, breach handling, data subject request handling, and consent controls where consent is the lawful basis.",
    ],
  },
  {
    title: "EU and UK visitors",
    body: [
      "If Velico targets or monitors people in the EU or UK, GDPR-style requirements may apply. For cookies and similar tracking technologies, consent is normally required before non-essential cookies are set.",
      "Consent should be freely given, specific, informed, unambiguous, and based on a clear affirmative action.",
    ],
  },
  {
    title: "United States and California",
    body: [
      "If Velico meets CCPA thresholds or handles California residents' data in covered ways, it may need CCPA notices and rights workflows.",
      "The CCPA includes rights to know, delete, correct, opt out of sale or sharing, limit sensitive personal information, and non-discrimination.",
    ],
  },
  {
    title: "Do you need cookie consent?",
    body: [
      "For this codebase as inspected on September 7, 2026, strictly necessary session cookies are used for authentication and route protection, and localStorage is used for preferences. That alone usually calls for disclosure, not an opt-in banner.",
      "A cookie consent banner becomes important before enabling analytics, marketing pixels, cross-site behavioral ads, heatmaps, or other non-essential tracking. The banner added here stores those choices so future tracking can respect them.",
    ],
  },
];

const references = [
  { href: "https://ndpc.gov.ng/", label: "Nigeria Data Protection Commission" },
  { href: "https://placng.org/i/wp-content/uploads/2023/06/Nigeria-Data-Protection-Act-2023.pdf", label: "Nigeria Data Protection Act, 2023" },
  { href: "https://www.dataprotection.ie/en/dpc-guidance/guidance-cookies-and-other-tracking-technologies", label: "EU cookie guidance reference" },
  { href: "https://oag.ca.gov/privacy/ccpa", label: "California CCPA information" },
];

export default function DataPrivacyLawPage() {
  return (
    <LegalPage
      title="Data Privacy Law"
      eyebrow="Compliance"
      intro="A plain-language overview of privacy obligations that may matter for Velico. This is product guidance, not legal advice."
      sections={sections}
    >
      <Card className="p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[var(--heading)]">References</h2>
        <div className="mt-4 grid gap-3 text-sm font-medium text-[var(--muted)]">
          {references.map((reference) => (
            <Link
              key={reference.href}
              href={reference.href}
              className="inline-flex items-center gap-2 hover:text-[var(--brand-blue)]"
              target="_blank"
              rel="noreferrer"
            >
              {reference.label}
              <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Card>
    </LegalPage>
  );
}
