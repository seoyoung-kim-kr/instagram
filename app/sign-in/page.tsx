"use client";

import GradientBtn from "@/components/GradientBtn";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/50">
        <h1 className="mb-6 text-3xl font-semibold text-slate-900">Sign in</h1>
        <p className="mb-8 max-w-md text-sm text-slate-600">
          Sign in with Google to continue to your Instagram-style feed.
        </p>

        <GradientBtn
          text="Sign in With Google"
          onClick={() => signIn("google", { callbackUrl })}
        />
      </div>
    </section>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
