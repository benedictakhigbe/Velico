import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Velico terms and conditions for using the business workspace.",
};

const sections = [
  {
    title: "Using Velico",
    body: [
      "Velico provides business operations tools for sales, inventory, expenses, invoices, reports, AI assistance, billing, and related workflows. You are responsible for the accuracy of the information you enter and for how you use outputs from the workspace.",
      "You must keep account credentials secure, use the service lawfully, and avoid uploading content you do not have rights to process.",
    ],
  },
  {
    title: "Plans and payments",
    body: [
      "Paid subscriptions are billed through Paystack where available. Prices, billing periods, included usage, and plan limits may vary by plan and will be shown before payment.",
      "Taxes, payment disputes, failed transactions, renewals, cancellations, and refunds should be handled according to the checkout terms shown at purchase and any written agreement with Velico.",
    ],
  },
  {
    title: "AI and business information",
    body: [
      "AI features are decision-support tools. They may summarize records or suggest next actions, but they do not replace professional financial, tax, legal, or operational advice.",
      "You should review AI outputs before acting on them, especially where the result affects money, compliance, customers, employees, or vendors.",
    ],
  },
  {
    title: "Availability and changes",
    body: [
      "Velico may update, add, suspend, or remove features to improve security, performance, compliance, or product quality.",
      "The service is provided with reasonable care, but uninterrupted availability is not guaranteed.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Questions about these terms can be sent to the Velico support or legal contact supplied by the business owner before launch.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      eyebrow="Legal"
      intro="These terms set the baseline for using Velico. They should be reviewed by counsel before public launch."
      sections={sections}
    />
  );
}
