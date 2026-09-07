import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "How Velico uses cookies, local storage, and similar technologies.",
};

const sections = [
  {
    title: "Current cookie use",
    body: [
      "Velico currently uses essential HTTP-only session cookies named __session and __demo_session to keep users signed in and protect app routes.",
      "Velico also stores local preferences such as theme, integration settings, and cookie choices in browser localStorage.",
    ],
  },
  {
    title: "Third-party technologies",
    body: [
      "Firebase authentication may use security checks, including reCAPTCHA for phone signup. Paystack may use its own payment and fraud-prevention technologies during checkout.",
      "These tools are used to provide account security and payment functionality.",
    ],
  },
  {
    title: "Analytics and marketing cookies",
    body: [
      "No analytics or marketing cookies are currently wired in this codebase. If Velico adds analytics, pixels, ads, or cross-site tracking, the cookie banner should be connected to those tools before they run.",
      "Visitors can choose essential-only preferences in the banner. Essential cookies are still required for login, security, payments, and core app behavior.",
    ],
  },
  {
    title: "Managing cookies",
    body: [
      "You can block or delete cookies in your browser settings, but doing so may prevent sign-in or secure workspace access.",
      "You can also clear Velico localStorage values from your browser if you want to reset local preferences.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies Policy"
      eyebrow="Cookies"
      intro="This policy describes Velico cookies, local storage, and similar browser technologies."
      sections={sections}
    />
  );
}
