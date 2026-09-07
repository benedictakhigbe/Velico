"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  type ConfirmationResult,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  updatePassword,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { getFirebaseAuth, hasFirebaseBrowserConfig } from "@/lib/firebase/client";

type AuthMode = "login" | "signup" | "forgot" | "reset";

type FirebaseAuthFormProps = {
  mode: AuthMode;
};

function getAuthErrorMessage(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";

  if (
    code === "auth/configuration-not-found" ||
    (error instanceof Error && error.message.includes("auth/configuration-not-found"))
  ) {
    return "Firebase Email/Password sign-in is not enabled for this project yet.";
  }

  if (code === "auth/operation-not-allowed") {
    return "This Firebase sign-in provider is not enabled yet.";
  }

  if (code === "auth/invalid-phone-number") {
    return "Enter the phone number in international format, for example +2348012345678.";
  }

  if (code === "auth/invalid-verification-code") {
    return "The OTP code is incorrect. Check the code and try again.";
  }

  return error instanceof Error ? error.message : "Something went wrong.";
}

export function FirebaseAuthForm({ mode }: FirebaseAuthFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [signupMethod, setSignupMethod] = useState<"email" | "phone">("email");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const firebaseReady = hasFirebaseBrowserConfig();
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const canSubmit = firebaseReady || (mode === "login" && demoMode);

  async function createServerSession(idToken: string) {
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(payload?.error ?? "Could not create a secure session.");
    }
  }

  async function startDemoSession() {
    setMessage(null);
    const response = await fetch("/api/auth/demo", { method: "POST" });

    if (!response.ok) {
      setMessage("Demo mode is not enabled on this environment.");
      return;
    }

    router.push("/app");
  }

  function getRecaptchaVerifier() {
    const auth = getFirebaseAuth();

    if (!recaptchaVerifier.current) {
      recaptchaVerifier.current = new RecaptchaVerifier(auth, "phone-signup-recaptcha", {
        size: "invisible",
      });
    }

    return recaptchaVerifier.current;
  }

  function onSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      try {
        if ((mode === "login" || mode === "signup") && demoMode) {
          await startDemoSession();
          return;
        }

        if (!firebaseReady) {
          setMessage(
            demoMode
              ? "Firebase sign-in needs the missing API key and app ID. Use the demo workspace for now."
              : "Firebase sign-in is not configured yet.",
          );
          return;
        }

        const auth = getFirebaseAuth();
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");
        const phone = String(formData.get("phone") ?? "").trim();
        const code = String(formData.get("code") ?? "").trim();

        if (mode === "login") {
          const credential = await signInWithEmailAndPassword(auth, email, password);
          await createServerSession(await credential.user.getIdToken());
          router.push("/app");
          return;
        }

        if (mode === "signup") {
          if (signupMethod === "phone") {
            if (confirmationResult) {
              const credential = await confirmationResult.confirm(code);
              await createServerSession(await credential.user.getIdToken());
              router.push("/app/onboarding");
              return;
            }

            const result = await signInWithPhoneNumber(auth, phone, getRecaptchaVerifier());
            setConfirmationResult(result);
            setMessage("OTP sent. Enter the verification code to finish registration.");
            return;
          }

          const credential = await createUserWithEmailAndPassword(auth, email, password);
          await sendEmailVerification(credential.user, {
            url: `${window.location.origin}/app/onboarding`,
          });
          await createServerSession(await credential.user.getIdToken());
          router.push("/app/onboarding");
          return;
        }

        if (mode === "forgot") {
          await sendPasswordResetEmail(auth, email, {
            url: `${window.location.origin}/reset-password`,
          });
          setMessage("Password reset link sent.");
          return;
        }

        if (mode === "reset" && auth.currentUser) {
          await updatePassword(auth.currentUser, password);
          router.push("/app");
          return;
        }

        setMessage("Please sign in again before updating your password.");
      } catch (error) {
        const message = getAuthErrorMessage(error);

        if (demoMode && message.toLowerCase().includes("not enabled")) {
          await startDemoSession();
          return;
        }

        setMessage(message);
      }
    });
  }

  const submitLabel = {
    login: "Sign in",
    signup:
      signupMethod === "phone"
        ? confirmationResult
          ? "Verify phone"
          : "Send OTP"
        : "Create account",
    forgot: "Send reset link",
    reset: "Update password",
  }[mode];

  return (
    <form action={onSubmit} className="grid gap-4">
      {message ? (
        <p className="rounded-[8px] border border-[var(--border-strong)] bg-[var(--brand-soft)] px-3 py-2 text-sm text-[var(--heading)]">
          {message}
        </p>
      ) : null}
      {!firebaseReady ? (
        <p className="rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--muted)]">
          Firebase credentials are incomplete. The demo workspace is available while the API key and
          app ID are being added.
        </p>
      ) : null}
      {mode === "signup" ? (
        <div className="grid grid-cols-2 gap-2 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-1">
          <button
            type="button"
            className={
              signupMethod === "email"
                ? "h-10 rounded-[8px] bg-[var(--surface)] text-sm font-semibold text-[var(--heading)] shadow-sm"
                : "h-10 rounded-[8px] text-sm font-semibold text-[var(--muted)]"
            }
            onClick={() => {
              setSignupMethod("email");
              setConfirmationResult(null);
              setMessage(null);
            }}
          >
            Email
          </button>
          <button
            type="button"
            className={
              signupMethod === "phone"
                ? "h-10 rounded-[8px] bg-[var(--surface)] text-sm font-semibold text-[var(--heading)] shadow-sm"
                : "h-10 rounded-[8px] text-sm font-semibold text-[var(--muted)]"
            }
            onClick={() => {
              setSignupMethod("phone");
              setConfirmationResult(null);
              setMessage(null);
            }}
          >
            Phone
          </button>
        </div>
      ) : null}
      {mode === "signup" && signupMethod === "phone" ? (
        <>
          <Field
            label="Phone number"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+2348012345678"
            required
            disabled={Boolean(confirmationResult)}
          />
          {confirmationResult ? (
            <Field
              label="OTP code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
          ) : null}
          <div id="phone-signup-recaptcha" />
        </>
      ) : mode !== "reset" ? (
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      ) : null}
      {mode !== "forgot" && !(mode === "signup" && signupMethod === "phone") ? (
        <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]" htmlFor="password">
          <span>{mode === "reset" ? "New password" : "Password"}</span>
          <span className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              className="h-11 w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 pr-12 text-base text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted)] hover:border-[var(--border-strong)] focus:border-[var(--brand-blue)]"
            />
            <button
              type="button"
              className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-[8px] text-[var(--muted)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--heading)]"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </span>
          {mode === "signup" ? (
            <span className="text-xs font-normal text-[var(--muted)]">Use at least 8 characters.</span>
          ) : null}
        </label>
      ) : null}
      <Button type="submit" className="w-full" disabled={isPending || !canSubmit}>
        {isPending ? "Please wait..." : submitLabel}
      </Button>
      {mode === "login" && demoMode ? (
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={isPending}
          onClick={() => {
            startTransition(startDemoSession);
          }}
        >
          Open demo workspace
        </Button>
      ) : null}
    </form>
  );
}
