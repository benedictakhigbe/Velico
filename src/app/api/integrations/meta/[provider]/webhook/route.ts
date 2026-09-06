import { NextResponse } from "next/server";

const allowedProviders = new Set(["whatsapp", "instagram", "facebook", "business"]);

function getExpectedVerifyToken(provider: string) {
  const providerToken = process.env[`META_${provider.toUpperCase()}_WEBHOOK_VERIFY_TOKEN`];
  return providerToken || process.env.META_WEBHOOK_VERIFY_TOKEN;
}

export async function GET(request: Request, context: RouteContext<"/api/integrations/meta/[provider]/webhook">) {
  const { provider } = await context.params;

  if (!allowedProviders.has(provider)) {
    return NextResponse.json({ error: "Unsupported Meta integration provider." }, { status: 404 });
  }

  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expectedToken = getExpectedVerifyToken(provider);

  if (mode === "subscribe" && challenge && (token === expectedToken || (!expectedToken && process.env.NODE_ENV !== "production"))) {
    return new NextResponse(challenge, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Webhook verification failed." }, { status: 403 });
}

export async function POST(request: Request, context: RouteContext<"/api/integrations/meta/[provider]/webhook">) {
  const { provider } = await context.params;

  if (!allowedProviders.has(provider)) {
    return NextResponse.json({ error: "Unsupported Meta integration provider." }, { status: 404 });
  }

  const event = await request.json().catch(() => null);

  console.info("Received Meta integration webhook", {
    provider,
    object: typeof event === "object" && event && "object" in event ? event.object : null,
  });

  return NextResponse.json({ ok: true, provider });
}
