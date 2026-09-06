import { Timestamp } from "firebase-admin/firestore";
import { adminDb, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";
import { paystackPlans } from "@/lib/paystack";

export type BillingEventRow = {
  reference: string;
  plan: string;
  status: string;
  amount: string;
  date: string;
};

export type BillingPageData = {
  subscription: {
    planCode: string;
    status: string;
    billingCycle?: string;
    currentPeriodEnd?: string;
  };
  events: BillingEventRow[];
  publicKey?: string;
  isFallback: boolean;
  message?: string;
};

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  month: "short",
  day: "2-digit",
});

function formatDate(value: unknown) {
  if (value instanceof Timestamp) {
    return dateFormatter.format(value.toDate());
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
  }

  return "-";
}

function formatAmount(value: unknown) {
  const amount = typeof value === "number" ? value : 0;
  return currencyFormatter.format(amount).replace("NGN", "NGN ");
}

const setupBillingEvents: BillingEventRow[] = [
  {
    reference: "SETUP-STARTER",
    plan: "Starter",
    status: "available",
    amount: "NGN 5,000",
    date: "Monthly",
  },
  {
    reference: "SETUP-GROWTH",
    plan: "Growth",
    status: "available",
    amount: "NGN 12,000",
    date: "Monthly",
  },
  {
    reference: "SETUP-BUSINESS",
    plan: "Business",
    status: "available",
    amount: "NGN 30,000",
    date: "Monthly",
  },
];

export async function getBillingPageData(): Promise<BillingPageData> {
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    return {
      subscription: { planCode: "trial", status: "needs setup" },
      events: [],
      isFallback: false,
      message: "Create a workspace before managing billing.",
    };
  }

  if (!hasFirebaseAdminCredentials()) {
    return {
      subscription: { planCode: "trial", status: "setup mode" },
      events: setupBillingEvents,
      publicKey: process.env.PAYSTACK_PUBLIC_KEY,
      isFallback: true,
      message:
        "Billing is running in setup mode. Add Firebase Admin credentials to save paid subscriptions and billing events.",
    };
  }

  try {
    const [subscriptionDoc, eventsSnapshot] = await Promise.all([
      adminDb().collection("subscriptions").doc(organizationId).get(),
      adminDb()
        .collection("billingEvents")
        .where("organizationId", "==", organizationId)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get(),
    ]);
    const subscriptionData = subscriptionDoc.data();
    const events = eventsSnapshot.docs.map((doc) => {
      const data = doc.data();
      const planCode = String(data.planCode ?? "");
      const knownPlan = planCode in paystackPlans ? paystackPlans[planCode as keyof typeof paystackPlans] : null;

      return {
        reference: String(data.reference ?? doc.id),
        plan: knownPlan?.name ?? (planCode || "Plan"),
        status: String(data.status ?? "pending"),
        amount: formatAmount(data.amount),
        date: formatDate(data.createdAt),
      };
    });

    return {
      subscription: {
        planCode: String(subscriptionData?.planCode ?? "trial"),
        status: String(subscriptionData?.status ?? "trialing"),
        billingCycle: String(subscriptionData?.billingCycle ?? "monthly"),
        currentPeriodEnd: formatDate(subscriptionData?.currentPeriodEnd),
      },
      events,
      publicKey: process.env.PAYSTACK_PUBLIC_KEY,
      isFallback: false,
    };
  } catch {
    return {
      subscription: { planCode: "trial", status: "trialing" },
      events: setupBillingEvents,
      publicKey: process.env.PAYSTACK_PUBLIC_KEY,
      isFallback: true,
      message:
        "Billing is using setup mode because Firebase is not reachable. Check your Firebase Admin credentials before accepting live subscriptions.",
    };
  }
}
