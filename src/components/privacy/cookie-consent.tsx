"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const storageKey = "velico-cookie-preferences";

type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const essentialOnly: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(!window.localStorage.getItem(storageKey));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function savePreferences(preferences: CookiePreferences) {
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-[8px] border border-[var(--border-strong)] bg-[var(--surface)] p-4 shadow-2xl sm:bottom-5 sm:p-5"
      aria-label="Cookie preferences"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Cookie className="size-5 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" />
            <h2 className="text-base font-semibold text-[var(--heading)]">Cookie preferences</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Velico currently uses essential session cookies and local preferences. Choose whether we may
            use analytics or marketing cookies if those tools are added.
          </p>
          <Link href="/cookies" className="mt-2 inline-flex text-sm font-semibold text-[var(--brand-blue)]">
            Read cookies policy
          </Link>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          <Button type="button" variant="secondary" onClick={() => savePreferences(essentialOnly)}>
            <X className="size-4" aria-hidden="true" />
            Essential only
          </Button>
          <Button
            type="button"
            onClick={() =>
              savePreferences({
                essential: true,
                analytics: true,
                marketing: true,
              })
            }
          >
            <Settings className="size-4" aria-hidden="true" />
            Allow all
          </Button>
        </div>
      </div>
    </section>
  );
}
