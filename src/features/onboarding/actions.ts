"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { requireUser } from "@/lib/firebase/auth";
import { adminDb } from "@/lib/firebase/admin";

const onboardingSchema = z.object({
  businessName: z.string().min(2).max(120),
  businessType: z.enum(["retail", "services", "hybrid", "online", "other"]),
  country: z.string().min(2).max(80).default("Nigeria"),
  currency: z.string().length(3).default("NGN"),
  phone: z.string().min(7).max(30),
  industry: z.string().min(2).max(80),
  teamSize: z.coerce.number().int().min(1).max(500),
  state: z.string().min(2).max(80),
  city: z.string().min(2).max(80),
  productsOrServices: z.string().min(2).max(240),
  monthlyRevenueRange: z.string().min(2).max(80),
  mainSalesChannel: z.enum([
    "whatsapp",
    "instagram",
    "website",
    "physical-shop",
    "facebook",
    "tiktok",
    "marketplace",
    "other",
  ]),
  mainBusinessGoal: z.enum([
    "increase-sales",
    "increase-profit",
    "reduce-expenses",
    "get-more-customers",
    "improve-retention",
    "improve-inventory",
    "improve-staff",
    "grow-online",
  ]),
});

export async function completeOnboardingAction(formData: FormData) {
  const values = onboardingSchema.parse({
    businessName: formData.get("businessName"),
    businessType: formData.get("businessType"),
    country: formData.get("country") || "Nigeria",
    currency: formData.get("currency") || "NGN",
    phone: formData.get("phone"),
    industry: formData.get("industry"),
    teamSize: formData.get("teamSize"),
    state: formData.get("state"),
    city: formData.get("city"),
    productsOrServices: formData.get("productsOrServices"),
    monthlyRevenueRange: formData.get("monthlyRevenueRange"),
    mainSalesChannel: formData.get("mainSalesChannel"),
    mainBusinessGoal: formData.get("mainBusinessGoal"),
  });
  const { user } = await requireUser();
  const db = adminDb();
  const organizationRef = db.collection("organizations").doc();
  const organizationId = organizationRef.id;
  const memberId = `${organizationId}_${user.uid}`;
  const now = FieldValue.serverTimestamp();

  try {
    const batch = db.batch();

    batch.set(db.collection("profiles").doc(user.uid), {
      email: user.email ?? null,
      fullName: user.name ?? null,
      phone: user.phoneNumber ?? null,
      avatarUrl: null,
      createdAt: now,
      updatedAt: now,
    }, { merge: true });

    batch.set(organizationRef, {
      name: values.businessName,
      businessType: values.businessType,
      country: values.country,
      currency: values.currency,
      phone: values.phone,
      industry: values.industry,
      teamSize: values.teamSize,
      state: values.state,
      city: values.city,
      productsOrServices: values.productsOrServices,
      monthlyRevenueRange: values.monthlyRevenueRange,
      mainSalesChannel: values.mainSalesChannel,
      mainBusinessGoal: values.mainBusinessGoal,
      ownerId: user.uid,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });

    batch.set(db.collection("organizationMembers").doc(memberId), {
      organizationId,
      userId: user.uid,
      role: "owner",
      status: "active",
      invitedBy: null,
      createdAt: now,
      updatedAt: now,
    });

    batch.set(db.collection("businessSettings").doc(organizationId), {
      organizationId,
      invoicePrefix: "VEL",
      invoiceNextNumber: 1,
      defaultCurrency: values.currency,
      taxLabel: "VAT",
      taxRate: 0,
      receiptFooter: null,
      createdAt: now,
      updatedAt: now,
    });

    batch.set(db.collection("subscriptions").doc(organizationId), {
      organizationId,
      planCode: "trial",
      status: "trialing",
      currentPeriodStart: now,
      currentPeriodEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
      createdAt: now,
      updatedAt: now,
    });

    batch.set(db.collection("auditLogs").doc(), {
      organizationId,
      actorId: user.uid,
      action: "organization.created",
      entityType: "organization",
      entityId: organizationId,
      metadata: { source: "onboarding" },
      createdAt: now,
    });

    await batch.commit();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create workspace.";
    redirect(`/app/onboarding?message=${encodeURIComponent(message)}`);
  }

  redirect("/app");
}
