"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";
import { getActiveOrganizationId, requireUser } from "@/lib/firebase/auth";

export type ExpenseActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const expenseSchema = z.object({
  category: z.string().min(2).max(80),
  vendor: z.string().min(2).max(120),
  amount: z.coerce.number().positive().max(999_999_999),
  date: z.string().min(8).max(20),
  notes: z.string().max(500).optional(),
  recurring: z.boolean(),
});

export async function createExpenseAction(
  _previousState: ExpenseActionState,
  formData: FormData,
): Promise<ExpenseActionState> {
  const { user } = await requireUser();
  const organizationId = await getActiveOrganizationId(user.uid);

  if (!organizationId) {
    redirect("/app/onboarding");
  }

  const parsed = expenseSchema.safeParse({
    category: formData.get("category"),
    vendor: formData.get("vendor"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    notes: formData.get("notes") || undefined,
    recurring: formData.get("recurring") === "on",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the expense details and try again.",
    };
  }

  try {
    const now = FieldValue.serverTimestamp();

    await adminDb().collection("expenses").add({
      organizationId,
      category: parsed.data.category,
      vendor: parsed.data.vendor,
      amount: parsed.data.amount,
      currency: "NGN",
      expenseDate: parsed.data.date,
      notes: parsed.data.notes ?? null,
      recurring: parsed.data.recurring,
      receiptUrl: null,
      createdBy: user.uid,
      createdAt: now,
      updatedAt: now,
    });

    revalidatePath("/app/expenses");

    return {
      status: "success",
      message: "Expense saved to Firebase.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? `Firebase could not save this expense: ${error.message}`
          : "Firebase could not save this expense.",
    };
  }
}
