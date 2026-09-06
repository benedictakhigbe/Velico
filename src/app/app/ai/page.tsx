import { ModulePage } from "@/components/layout/module-page";
import { WorkingSection } from "@/components/layout/working-section";
import { AiAdvisorChat } from "@/features/ai/ai-advisor-chat";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function AiPage({
  searchParams,
}: {
  searchParams: Promise<{ question?: string }>;
}) {
  await requireRouteAccess("/app/ai");

  const params = await searchParams;
  const provider = process.env.AI_PROVIDER ?? "openai-compatible";
  const hasAiKey = Boolean(
    provider === "groq"
      ? process.env.GROQ_API_KEY ?? process.env.AI_PROVIDER_API_KEY
      : process.env.AI_PROVIDER_API_KEY,
  );
  const hasAiProvider = Boolean(hasAiKey && process.env.AI_PROVIDER_MODEL);

  return (
    <ModulePage
      eyebrow="Ask Velico"
      title="AI Business Advisor"
      description="Ask about business strategy, marketing, WhatsApp, Instagram, Facebook, pricing, customers, cash flow, restock advice, and debt follow-ups."
    >
      <div className="grid gap-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--muted)]">Advisor mode</p>
            <p className="mt-2 text-xl font-semibold text-[var(--heading)]">
              {hasAiProvider ? provider : "Local"}
            </p>
          </div>
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--muted)]">Data source</p>
            <p className="mt-2 text-xl font-semibold text-[var(--heading)]">Firebase</p>
          </div>
          <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
            <p className="text-sm text-[var(--muted)]">Scope</p>
            <p className="mt-2 text-xl font-semibold text-[var(--heading)]">Business + marketing</p>
          </div>
        </div>
        <WorkingSection
          title="Business chat"
          description="Velico AI reads the records available to your account and can also help with marketing plans, customer follow-ups, content ideas, and growth decisions."
        >
          <AiAdvisorChat initialQuestion={typeof params.question === "string" ? params.question : undefined} />
        </WorkingSection>
      </div>
    </ModulePage>
  );
}
