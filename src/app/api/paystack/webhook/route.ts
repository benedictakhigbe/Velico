import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { paystackPlans, verifyPaystackSignature } from "@/lib/paystack";

type PaystackWebhookEvent = {
  event?: string;
  data?: {
    id?: number;
    reference?: string;
    status?: string;
    amount?: number;
    currency?: string;
    paid_at?: string;
    customer?: {
      email?: string;
    };
    metadata?: {
      organizationId?: string;
      userId?: string;
      planCode?: string;
      planName?: string;
    };
  };
};

function getPeriodEnd() {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!verifyPaystackSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid Paystack signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as PaystackWebhookEvent;
  const data = event.data;
  const reference = data?.reference;
  const organizationId = data?.metadata?.organizationId;
  const planCode = data?.metadata?.planCode;
  const now = FieldValue.serverTimestamp();

  if (!reference) {
    return NextResponse.json({ ok: true });
  }

  const db = adminDb();
  const batch = db.batch();
  const billingEventRef = db.collection("billingEvents").doc(reference);

  batch.set(
    billingEventRef,
    {
      organizationId: organizationId ?? null,
      actorId: data?.metadata?.userId ?? null,
      provider: "paystack",
      type: event.event ?? "paystack.event",
      status: data?.status ?? "received",
      reference,
      paystackTransactionId: data?.id ?? null,
      amount: typeof data?.amount === "number" ? data.amount / 100 : null,
      currency: data?.currency ?? "NGN",
      customerEmail: data?.customer?.email ?? null,
      rawEvent: event,
      updatedAt: now,
      createdAt: now,
    },
    { merge: true },
  );

  if (
    event.event === "charge.success" &&
    data?.status === "success" &&
    organizationId &&
    planCode &&
    planCode in paystackPlans
  ) {
    batch.set(
      db.collection("subscriptions").doc(organizationId),
      {
        organizationId,
        planCode,
        status: "active",
        provider: "paystack",
        paystackReference: reference,
        currentPeriodStart: data.paid_at ? new Date(data.paid_at) : now,
        currentPeriodEnd: getPeriodEnd(),
        cancelAtPeriodEnd: false,
        updatedAt: now,
      },
      { merge: true },
    );
  }

  await batch.commit();

  return NextResponse.json({ ok: true });
}
