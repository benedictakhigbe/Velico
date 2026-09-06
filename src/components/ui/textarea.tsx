import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
};

export function Textarea({ className, label, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]" htmlFor={inputId}>
      <span>{label}</span>
      <textarea
        id={inputId}
        className={cn(
          "min-h-28 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted)] focus:border-[var(--brand-blue)]",
          className,
        )}
        {...props}
      />
    </label>
  );
}
