import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const variants = {
  primary:
    "bg-[var(--brand-blue)] text-white shadow-sm hover:bg-[var(--brand-deep)]",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--heading)] hover:bg-[var(--surface-muted)]",
  ghost: "text-[var(--foreground)] hover:bg-[var(--surface-muted)]",
  danger: "bg-[var(--danger)] text-white hover:brightness-95",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-velico-ripple
      className={cn(
        "relative isolate inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-[8px] px-4 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonProps["variant"];
};

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-velico-ripple
      className={cn(
        "relative isolate inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-[8px] px-4 text-sm font-semibold transition active:scale-[0.98]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
