import crypto from "node:crypto";
import https from "node:https";
import { getPlanAmount, paystackPlans, type PaystackPlanCode } from "@/lib/billing/plans";

export { getPlanAmount, paystackPlans, type PaystackPlanCode };

const PAYSTACK_BASE_URL = "https://api.paystack.co";

type InitializeTransactionInput = {
  email: string;
  amount: number;
  currency?: string;
  callbackUrl: string;
  reference: string;
  metadata: Record<string, string | number | boolean | null>;
};

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at?: string;
    customer?: {
      email?: string;
    };
    metadata?: Record<string, string | number | boolean | null>;
  };
};

function getPaystackSecretKey() {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }

  return secretKey;
}

function allowsInsecureLocalTls() {
  return process.env.NODE_ENV !== "production";
}

async function paystackRequest<TResponse>(path: string, init: { method?: "GET" | "POST"; body?: unknown } = {}) {
  const url = new URL(path, PAYSTACK_BASE_URL);
  const body = init.body ? JSON.stringify(init.body) : undefined;

  return new Promise<{ ok: boolean; status: number; payload: TResponse }>((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: init.method ?? "GET",
        rejectUnauthorized: !allowsInsecureLocalTls(),
        headers: {
          Authorization: `Bearer ${getPaystackSecretKey()}`,
          "Content-Type": "application/json",
          ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
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

    if (body) {
      request.write(body);
    }

    request.end();
  });
}

export function getPaystackPublicKey() {
  return process.env.PAYSTACK_PUBLIC_KEY;
}

export function amountToSubunit(amount: number) {
  return Math.round(amount * 100);
}

export function createPaymentReference(prefix = "velico") {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

export async function initializePaystackTransaction(input: InitializeTransactionInput) {
  const response = await paystackRequest<PaystackInitializeResponse>("/transaction/initialize", {
    method: "POST",
    body: {
      email: input.email,
      amount: input.amount,
      currency: input.currency ?? "NGN",
      callback_url: input.callbackUrl,
      reference: input.reference,
      metadata: input.metadata,
    },
  });
  const payload = response.payload;

  if (!response.ok || !payload.status || !payload.data?.authorization_url) {
    throw new Error(payload.message || "Paystack could not initialize the transaction.");
  }

  return payload.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const response = await paystackRequest<PaystackVerifyResponse>(
    `/transaction/verify/${encodeURIComponent(reference)}`,
  );
  const payload = response.payload;

  if (!response.ok || !payload.status || !payload.data) {
    throw new Error(payload.message || "Paystack could not verify the transaction.");
  }

  return payload.data;
}

export function verifyPaystackSignature(rawBody: string, signature: string | null) {
  if (!signature) {
    return false;
  }

  const expected = crypto
    .createHmac("sha512", getPaystackSecretKey())
    .update(rawBody)
    .digest("hex");

  if (expected.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
