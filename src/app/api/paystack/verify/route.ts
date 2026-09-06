import { FieldValue } from "firebase-admin/firestore";
import { NextResponse, type NextRequest } from "next/server";
import { adminDb, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";
import { paystackPlans, verifyPaystackTransaction } from "@/lib/paystack";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing transaction reference." }, { status: 400 });
  }

  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    return NextResponse.json({ error: "Create a workspace before verifying billing." }, { status: 409 });
  }

  try {
    const transaction = await verifyPaystackTransaction(reference);
    const planCode = String(transaction.metadata?.planCode ?? "");

    if (!hasFirebaseAdminCredentials()) {
      return NextResponse.json({
        status: transaction.status,
        reference,
        warning:
          "Payment was verified, but Firebase Admin credentials are missing so the subscription could not be saved.",
      });
    }

    const now = FieldValue.serverTimestamp();
    const db = adminDb();
    const batch = db.batch();

    batch.set(
      db.collection("billingEvents").doc(reference),
      {
        organizationId,
        actorId: user.uid,
        provider: "paystack",
        type: "transaction.verified",
        status: transaction.status,
        reference,
        paystackTransactionId: transaction.id,
        planCode: planCode || null,
        amount: transaction.amount / 100,
        currency: transaction.currency,
        customerEmail: transaction.customer?.email ?? user.email ?? null,
        updatedAt: now,
      },
      { merge: true },
    );

    if (transaction.status === "success" && planCode in paystackPlans) {
      batch.set(
        db.collection("subscriptions").doc(organizationId),
        {
          organizationId,
          planCode,
          status: "active",
          provider: "paystack",
          paystackReference: reference,
          currentPeriodStart: transaction.paid_at ? new Date(transaction.paid_at) : now,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          cancelAtPeriodEnd: false,
          updatedAt: now,
        },
        { merge: true },
      );
    }

    await batch.commit();

    return NextResponse.json({ status: transaction.status, reference });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Paystack could not verify this transaction.",
      },
      { status: 500 },
    );
  }
}
