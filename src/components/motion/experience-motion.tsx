"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ExperienceMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-velico-animate]"),
    );

    animatedElements.forEach((element, index) => {
      element.animate(
        [
          { opacity: 0, transform: "translateY(14px) scale(0.99)" },
          { opacity: 1, transform: "translateY(0) scale(1)" },
        ],
        {
          delay: Math.min(index * 45, 360),
          duration: 520,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );
    });
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const interactiveCards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-velico-hover]"),
    );

    function onPointerMove(this: HTMLElement, event: PointerEvent) {
      const rect = this.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      this.style.setProperty("--tilt-x", `${(-y * 2.2).toFixed(2)}deg`);
      this.style.setProperty("--tilt-y", `${(x * 2.2).toFixed(2)}deg`);
      this.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      this.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }

    function onPointerLeave(this: HTMLElement) {
      this.style.setProperty("--tilt-x", "0deg");
      this.style.setProperty("--tilt-y", "0deg");
    }

    interactiveCards.forEach((card) => {
      card.addEventListener("pointermove", onPointerMove);
      card.addEventListener("pointerleave", onPointerLeave);
    });

    return () => {
      interactiveCards.forEach((card) => {
        card.removeEventListener("pointermove", onPointerMove);
        card.removeEventListener("pointerleave", onPointerLeave);
      });
    };
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const control = target?.closest<HTMLElement>("[data-velico-ripple]");

      if (!control) {
        return;
      }

      const rect = control.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);

      ripple.className = "velico-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      control.appendChild(ripple);
      ripple.animate(
        [
          { opacity: 0.22, transform: "scale(0)" },
          { opacity: 0, transform: "scale(2.35)" },
        ],
        {
          duration: 520,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      ).finished.finally(() => ripple.remove());
    }

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return null;
}
