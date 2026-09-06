"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { VelicoLoader } from "@/components/brand/velico-loader";

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function getInternalPathname(anchor: HTMLAnchorElement) {
  if (!anchor.href || anchor.target || anchor.hasAttribute("download")) {
    return null;
  }

  const url = new URL(anchor.href);

  if (url.origin !== window.location.origin) {
    return null;
  }

  if (url.pathname === window.location.pathname) {
    return null;
  }

  return url.pathname;
}

export function RouteLoadingIndicator() {
  const pathname = usePathname();
  const [loadingPathname, setLoadingPathname] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLoading = Boolean(loadingPathname && loadingPathname !== pathname);

  useEffect(() => {
    if (!loadingPathname) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setLoadingPathname(null);
    }, 12000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loadingPathname]);

  useEffect(() => {
    function showLoading(nextPathname = window.location.pathname) {
      setLoadingPathname(nextPathname);
    }

    function onBeforeUnload() {
      showLoading();
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest("a");

      if (anchor instanceof HTMLAnchorElement) {
        const nextPathname = getInternalPathname(anchor);

        if (nextPathname) {
          showLoading(nextPathname);
        }
      }
    }

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <VelicoLoader label="Loading page" />
    </div>
  );
}
