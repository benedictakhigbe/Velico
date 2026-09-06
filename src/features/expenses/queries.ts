import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";
import { expenses as demoExpenses } from "@/lib/velico/demo-data";

export type ExpenseRow = {
  category: string;
  vendor: string;
  date: string;
  amount: string;
};

export type ExpenseStats = Array<{ label: string; value: string; detail?: string }>;

export type ExpensePageData = {
  rows: ExpenseRow[];
  stats: ExpenseStats;
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

function formatAmount(amount: unknown) {
  return currencyFormatter.format(typeof amount === "number" ? amount : 0).replace("NGN", "NGN ");
}

function formatDate(value: unknown) {
  if (value instanceof Timestamp) {
    return dateFormatter.format(value.toDate());
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
  }

  return "Today";
}

function buildStats(rows: ExpenseRow[], rawAmounts: number[]): ExpenseStats {
  const todayLabel = dateFormatter.format(new Date());
  const todayTotal = rawAmounts.reduce((total, amount, index) => {
    return rows[index]?.date === todayLabel ? total + amount : total;
  }, 0);
  const monthlyTotal = rawAmounts.reduce((total, amount) => total + amount, 0);
  const categoryTotals = rows.reduce<Record<string, number>>((totals, row, index) => {
    totals[row.category] = (totals[row.category] ?? 0) + (rawAmounts[index] ?? 0);
    return totals;
  }, {});
  const largestCategory =
    Object.entries(categoryTotals).sort((first, second) => second[1] - first[1])[0]?.[0] ?? "-";

  return [
    { label: "Today", value: currencyFormatter.format(todayTotal).replace("NGN", "NGN ") },
    { label: "This month", value: currencyFormatter.format(monthlyTotal).replace("NGN", "NGN ") },
    { label: "Recorded", value: String(rows.length) },
    { label: "Largest category", value: largestCategory },
  ];
}

export async function getExpensePageData(): Promise<ExpensePageData> {
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    return {
      rows: [],
      stats: buildStats([], []),
      isFallback: false,
      message: "Create a workspace before recording expenses.",
    };
  }

  try {
    const snapshot = await adminDb()
      .collection("expenses")
      .where("organizationId", "==", organizationId)
      .orderBy("expenseDate", "desc")
      .limit(20)
      .get();

    const rawAmounts: number[] = [];
    const rows = snapshot.docs.map((doc) => {
      const data = doc.data();
      const amount = typeof data.amount === "number" ? data.amount : 0;
      rawAmounts.push(amount);

      return {
        category: String(data.category ?? "Uncategorized"),
        vendor: String(data.vendor ?? "Unknown"),
        date: formatDate(data.expenseDate),
        amount: formatAmount(amount),
      };
    });

    return {
      rows,
      stats: buildStats(rows, rawAmounts),
      isFallback: false,
    };
  } catch (error) {
    return {
      rows: demoExpenses,
      stats: [
        { label: "Today", value: "NGN 268,500" },
        { label: "This month", value: "NGN 812,000" },
        { label: "Recurring", value: "2" },
        { label: "Largest category", value: "Rent" },
      ],
      isFallback: true,
      message:
        error instanceof Error
          ? `Showing demo expenses because Firebase is not reachable: ${error.message}`
          : "Showing demo expenses because Firebase is not reachable.",
    };
  }
}
