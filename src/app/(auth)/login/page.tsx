import Link from "next/link";
import { AuthCard } from "@/features/auth/auth-card";
import { FirebaseAuthForm } from "@/features/auth/firebase-auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to manage sales, stock, invoices, and insights from one dashboard."
      message={typeof params.message === "string" ? params.message : undefined}
      backHref="/"
      footer={
        <>
          New to Velico?{" "}
          <Link href="/signup" className="font-semibold text-[var(--brand-blue)]">
            Start free
          </Link>
        </>
      }
    >
      <FirebaseAuthForm mode="login" />
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-[var(--muted)]">Secure Firebase session</span>
        <Link href="/forgot-password" className="font-semibold text-[var(--brand-blue)]">
          Forgot password?
        </Link>
      </div>
    </AuthCard>
  );
}
