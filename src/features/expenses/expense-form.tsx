"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, SelectField } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { createExpenseAction, type ExpenseActionState } from "@/features/expenses/actions";

const initialState: ExpenseActionState = {
  status: "idle",
  message: "",
};

export function ExpenseForm() {
  const [state, formAction, isPending] = useActionState(createExpenseAction, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      {state.message ? (
        <p
          className={
            state.status === "success"
              ? "rounded-[8px] border border-[var(--border-strong)] bg-[var(--brand-soft)] px-3 py-2 text-sm text-[var(--heading)]"
              : "rounded-[8px] border border-[var(--danger)] bg-[var(--danger-soft)] px-3 py-2 text-sm text-[var(--danger)]"
          }
        >
          {state.message}
        </p>
      ) : null}
      <SelectField label="Category" name="category" required>
        <option value="Rent">Rent</option>
        <option value="Logistics">Logistics</option>
        <option value="Utilities">Utilities</option>
        <option value="Inventory">Inventory</option>
        <option value="Salaries">Salaries</option>
        <option value="Marketing">Marketing</option>
      </SelectField>
      <Field label="Vendor/payee" name="vendor" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Amount" name="amount" type="number" min="1" step="1" placeholder="0.00" required />
        <Field label="Date" name="date" type="date" required />
      </div>
      <Field label="Receipt upload" name="receipt" type="file" disabled />
      <Textarea label="Notes" name="notes" />
      <label className="flex items-center gap-2 text-sm text-[var(--foreground)]">
        <input type="checkbox" name="recurring" /> Recurring expense
      </label>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save expense"}
      </Button>
    </form>
  );
}
