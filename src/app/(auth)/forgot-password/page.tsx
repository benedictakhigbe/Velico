import Link from "next/link";
import { AuthCard } from "@/features/auth/auth-card";
import { FirebaseAuthForm } from "@/features/auth/firebase-auth-form";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      title="Reset your password"
      subtitle="We will send a secure reset link to your email address."
      message={typeof params.message === "string" ? params.message : undefined}
      footer={
        <Link href="/login" className="font-semibold text-[var(--brand-blue)]">
          Return to sign in
        </Link>
      }
    >
      <FirebaseAuthForm mode="forgot" />
    </AuthCard>
  );
}
