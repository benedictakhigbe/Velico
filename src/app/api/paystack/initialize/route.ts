import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminDb, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";
import {
  amountToSubunit,
  createPaymentReference,
  getPlanAmount,
  initializePaystackTransaction,
  paystackPlans,
} from "@/lib/paystack";

const initializeSchema = z.object({
  planCode: z.enum(["starter", "growth", "business"]),
  billingCycle: z.enum(["monthly", "yearly"]).default("monthly"),
});

export async function POST(request: Request) {
  const payload = initializeSchema.safeParse(await request.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ error: "Choose a valid billing plan." }, { status: 400 });
  }

  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    return NextResponse.json({ error: "Create a workspace before starting billing." }, { status: 409 });
  }

  if (!user.email) {
    return NextResponse.json({ error: "Your account needs an email address for Paystack." }, { status: 400 });
  }

  const planCode = payload.data.planCode;
  const billingCycle = payload.data.billingCycle;
  const plan = paystackPlans[planCode];
  const amount = getPlanAmount(planCode, billingCycle);
  const reference = createPaymentReference(`${plan.code}-${billingCycle}`);
  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin}/app/billing?reference=${reference}`;

  try {
    const checkout = await initializePaystackTransaction({
      email: user.email,
      amount: amountToSubunit(amount),
      callbackUrl,
      reference,
      metadata: {
        organizationId,
        userId: user.uid,
        planCode: plan.code,
        planName: plan.name,
        billingCycle,
      },
    });
    const now = FieldValue.serverTimestamp();

    if (hasFirebaseAdminCredentials()) {
      try {
        await adminDb().collection("billingEvents").doc(reference).set({
          organizationId,
          actorId: user.uid,
          provider: "paystack",
          type: "transaction.initialized",
          status: "pending",
          reference,
          planCode: plan.code,
          billingCycle,
          amount,
          currency: "NGN",
          checkoutUrl: checkout.authorization_url,
          paystackAccessCode: checkout.access_code,
          createdAt: now,
          updatedAt: now,
        });
      } catch {
        // Checkout can still continue if Firebase Admin credentials are not ready locally.
      }
    }

    return NextResponse.json({
      authorizationUrl: checkout.authorization_url,
      reference: checkout.reference,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Paystack could not initialize the transaction.",
      },
      { status: 500 },
    );
  }
}
