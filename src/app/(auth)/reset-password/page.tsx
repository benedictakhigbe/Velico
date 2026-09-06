import { AuthCard } from "@/features/auth/auth-card";
import { FirebaseAuthForm } from "@/features/auth/firebase-auth-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      title="Choose a new password"
      subtitle="Set a fresh password for your Velico account."
      message={typeof params.message === "string" ? params.message : undefined}
      footer="You will be redirected to your workspace after the update."
    >
      <FirebaseAuthForm mode="reset" />
    </AuthCard>
  );
}
