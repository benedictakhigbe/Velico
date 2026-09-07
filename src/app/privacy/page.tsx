import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Velico collects, uses, protects, and shares personal data.",
};

const sections = [
  {
    title: "Information we collect",
    body: [
      "Velico may collect account details such as name, email address, phone number, organization details, authentication identifiers, payment references, and support messages.",
      "Business workspace data may include products, customers, staff records, orders, invoices, expenses, inventory activity, analytics, and AI prompts or responses.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use personal data to create and secure accounts, operate the workspace, process subscriptions, provide support, improve product quality, prevent abuse, and comply with legal obligations.",
      "Where consent is required for optional analytics, marketing, or similar tracking, Velico will ask for it before using those non-essential tools.",
    ],
  },
  {
    title: "Service providers",
    body: [
      "Velico uses service providers such as Firebase for authentication and data infrastructure, Paystack for payment processing, and AI infrastructure for advisor features.",
      "These providers process data only as needed to provide their services, subject to their own contractual and legal obligations.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Depending on your location, you may have rights to access, correct, delete, export, restrict, object to, or withdraw consent for certain processing of your personal data.",
      "California residents may also have rights under the CCPA, including rights to know, delete, correct, opt out of sale or sharing, limit sensitive data use, and avoid discrimination for exercising privacy rights.",
    ],
  },
  {
    title: "Security and retention",
    body: [
      "Velico uses account sessions, access controls, server-side secrets, and database rules to help protect workspace data.",
      "Personal data is kept only as long as needed for the purposes described in this policy, legal obligations, dispute resolution, security, and legitimate business records.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Privacy requests can be sent to the Velico privacy contact supplied by the business owner before launch. Requests may require identity verification.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Privacy"
      intro="This policy explains how Velico handles personal and business data. It is a practical starter policy and should be reviewed before launch."
      sections={sections}
    />
  );
}
