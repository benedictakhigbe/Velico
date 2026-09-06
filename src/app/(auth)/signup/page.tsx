import Link from "next/link";
import { AuthCard } from "@/features/auth/auth-card";
import { FirebaseAuthForm } from "@/features/auth/firebase-auth-form";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      title="Start your Velico workspace"
      subtitle="Create an owner account, then add your business details in onboarding."
      message={typeof params.message === "string" ? params.message : undefined}
      backHref="/"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--brand-blue)]">
            Sign in
          </Link>
        </>
      }
    >
      <FirebaseAuthForm mode="signup" />
    </AuthCard>
  );
}
