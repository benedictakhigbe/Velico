import https from "node:https";
import type { BusinessContext } from "@/lib/ai/business-context";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type OpenAICompatibleResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

function allowsInsecureLocalTls() {
  return process.env.NODE_ENV !== "production";
}

async function postJson<TResponse>(url: string, apiKey: string, body: unknown) {
  const requestBody = JSON.stringify(body);

  return new Promise<{ ok: boolean; status: number; payload: TResponse }>((resolve, reject) => {
    const request = https.request(
      new URL(url),
      {
        method: "POST",
        rejectUnauthorized: !allowsInsecureLocalTls(),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      },
      (response) => {
        const chunks: Buffer[] = [];

        response.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });
        response.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");

          try {
            resolve({
              ok: Boolean(response.statusCode && response.statusCode >= 200 && response.statusCode < 300),
              status: response.statusCode ?? 0,
              payload: JSON.parse(text) as TResponse,
            });
          } catch (error) {
            reject(error);
          }
        });
      },
    );

    request.on("error", reject);
    request.write(requestBody);
    request.end();
  });
}

function getQuestionFocus(question: string) {
  const lower = question.toLowerCase();

  if (
    lower.includes("marketing") ||
    lower.includes("advert") ||
    lower.includes("campaign") ||
    lower.includes("instagram") ||
    lower.includes("facebook") ||
    lower.includes("whatsapp") ||
    lower.includes("content") ||
    lower.includes("brand") ||
    lower.includes("promotion") ||
    lower.includes("social")
  ) {
    return "marketing";
  }

  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("discount") ||
    lower.includes("profit") ||
    lower.includes("margin")
  ) {
    return "pricing";
  }

  if (
    lower.includes("customer") ||
    lower.includes("retention") ||
    lower.includes("repeat") ||
    lower.includes("loyal") ||
    lower.includes("follow up")
  ) {
    return "customers";
  }

  if (
    lower.includes("grow") ||
    lower.includes("growth") ||
    lower.includes("strategy") ||
    lower.includes("business") ||
    lower.includes("plan") ||
    lower.includes("competitor")
  ) {
    return "strategy";
  }

  if (
    lower.includes("sale") ||
    lower.includes("sell") ||
    lower.includes("revenue") ||
    lower.includes("order")
  ) {
    return "sales";
  }

  if (lower.includes("stock") || lower.includes("inventory") || lower.includes("reorder")) {
    return "inventory";
  }

  if (lower.includes("expense") || lower.includes("spend") || lower.includes("cost")) {
    return "expenses";
  }

  if (lower.includes("invoice") || lower.includes("debt") || lower.includes("owe")) {
    return "invoices";
  }

  return "overview";
}

function createLocalAdvice(question: string, context: BusinessContext) {
  const focus = getQuestionFocus(question);
  const currencyTotal = `₦${context.summary.monthlyExpenseTotal.toLocaleString("en-NG")}`;
  const intro =
    context.source === "demo"
      ? "I am using built-in advisor mode with the demo workspace data."
      : "I reviewed the latest records available in your Velico workspace.";

  const focusAdvice = {
    marketing:
      "For marketing, start with one offer, one audience, and one channel. Use WhatsApp Status for warm customers, Instagram Reels for discovery, and Facebook posts or groups for local reach. Track each campaign by asking customers where they heard about you.",
    pricing:
      "For pricing, protect your margin before offering discounts. Bundle slow-moving items with popular products, use limited-time offers instead of permanent price cuts, and compare each promotion against stock cost and delivery cost.",
    customers:
      context.summary.customers > 0
        ? `You have ${context.summary.customers} visible customer record(s). Segment them into repeat buyers, unpaid customers, and inactive customers, then send different follow-up messages to each group.`
        : "Start capturing customer names, phone numbers, purchase notes, and source channel so retention advice can become more specific.",
    strategy:
      "For business strategy, focus on one measurable goal for the next 7 days: increase sales, reduce costs, collect debt, or improve repeat purchases. Pick the goal with the fastest cash impact, then review the numbers every evening.",
    sales:
      "To improve sales, push your strongest offer through the channel that already brings customers. Pair each promotion with a clear price, benefit, payment method, delivery option, and follow-up message.",
    inventory:
      context.summary.lowStockProducts > 0
        ? `Prioritize restocking the ${context.summary.lowStockProducts} low-stock item(s), then compare them against recent sales before buying deeply.`
        : "No low-stock product is visible in the current data, so focus on keeping fast sellers updated after each sale.",
    expenses: `Your visible expense total is ${currencyTotal}. Review recurring costs first, then flag any vendor payments that are not tied to revenue-generating activity.`,
    invoices:
      context.summary.overdueInvoices > 0
        ? `Follow up on ${context.summary.overdueInvoices} overdue invoice(s) today. Start with a short payment reminder and offer a clear payment link.`
        : "No overdue invoice is visible in the current data, so keep invoice follow-ups scheduled before due dates.",
    overview: `You have ${context.summary.products} product(s), ${context.summary.customers} customer(s), ${context.summary.invoices} invoice(s), and ${context.summary.expenses} expense record(s) in the current view.`,
  }[focus];

  return [
    intro,
    "",
    focusAdvice,
    "",
    "Recommended next actions:",
    "1. Update sales, expenses, and invoices daily so the advice gets sharper.",
    "2. Track where each customer came from: WhatsApp, Instagram, Facebook, referral, walk-in, or paid ad.",
    "3. Check low-stock items, unpaid invoices, and campaign results before spending more.",
    "",
    context.highlights.length > 0 ? `Signals I noticed: ${context.highlights.slice(0, 3).join(" ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function createPrompt(question: string, context: BusinessContext) {
  return [
    "You are Velico AI, a practical business and marketing advisor for Nigerian SMEs.",
    "Answer questions about sales, inventory, expenses, invoices, cash flow, customers, pricing, marketing, WhatsApp, Instagram, Facebook, content ideas, promotions, retention, and growth strategy.",
    "Give concise, specific advice that a small business owner can act on today.",
    "When marketing is involved, include audience, offer, channel, message angle, and what metric to track.",
    "Use the business context below. If data is thin, say what should be tracked next and give a sensible starter plan.",
    "Do not claim to be an accountant, lawyer, tax professional, or licensed financial adviser.",
    "Do not invent exact metrics, revenue, audience data, or campaign results that are not in the context.",
    "",
    `Business context: ${JSON.stringify(context)}`,
    "",
    `User question: ${question}`,
  ].join("\n");
}

export async function generateAdvisorResponse(question: string, history: ChatMessage[], context: BusinessContext) {
  const provider = process.env.AI_PROVIDER ?? "openai-compatible";
  const apiKey =
    provider === "groq"
      ? process.env.GROQ_API_KEY ?? process.env.AI_PROVIDER_API_KEY
      : process.env.AI_PROVIDER_API_KEY;
  const model = process.env.AI_PROVIDER_MODEL;
  const baseUrl = process.env.AI_PROVIDER_BASE_URL ?? "https://api.openai.com/v1";

  if (!apiKey || !model) {
    return {
      content: createLocalAdvice(question, context),
      provider: "local",
    };
  }

  try {
    const response = await postJson<OpenAICompatibleResponse>(
      `${baseUrl.replace(/\/$/, "")}/chat/completions`,
      apiKey,
      {
      model,
      messages: [
        { role: "system", content: createPrompt(question, context) },
        ...history.slice(-8),
        { role: "user", content: question },
      ],
      temperature: 0.3,
      max_tokens: 700,
      },
    );
    const payload = response.payload;
    const content = payload.choices?.[0]?.message?.content;

    if (!response.ok || !content) {
      throw new Error(payload.error?.message ?? "The AI provider could not generate a response.");
    }

    return {
      content,
      provider,
    };
  } catch {
    return {
      content: createLocalAdvice(question, context),
      provider: "local",
    };
  }
}
