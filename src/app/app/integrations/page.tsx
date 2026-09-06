import { ModulePage } from "@/components/layout/module-page";
import { IntegrationManager } from "@/features/integrations/integration-manager";
import { requireRouteAccess } from "@/lib/billing/subscription-access";

export default async function IntegrationsPage() {
  await requireRouteAccess("/app/integrations");

  return (
    <ModulePage
      eyebrow="Nigerian integrations"
      title="Social commerce links"
      description="Connect WhatsApp, Instagram, Facebook, TikTok, X, LinkedIn, YouTube, and your storefront with only the details customers need."
      framed={false}
    >
      <IntegrationManager />
    </ModulePage>
  );
}
