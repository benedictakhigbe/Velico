import type { Metadata } from "next";
import { PublicFooter } from "@/components/navigation/public-footer";
import { PublicHeader } from "@/components/navigation/public-header";
import { TaskCalculator } from "@/components/tools/task-calculator";

export const metadata: Metadata = {
  title: "Task Calculator",
  description: "Estimate Velico task workload, staffing time, and operating cost.",
};

export default function TaskCalculatorPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <PublicHeader activePath="/task-calculator" backHref="/" backLabel="Home" />
      <section className="velico-hero-scene px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              Planning tool
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[var(--heading)] sm:text-5xl lg:text-6xl">
              Task calculator
            </h1>
            <p className="mt-5 text-base leading-7 text-[var(--muted)] sm:text-lg">
              Estimate time, people, and cost before you assign a batch of work.
            </p>
          </div>
          <div className="mt-10">
            <TaskCalculator />
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
