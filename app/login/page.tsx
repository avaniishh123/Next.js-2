import { Suspense } from "react";
import LoginForm from "@/app/components/LoginForm";

export const metadata = {
  title: "Log In – TaskFlow Pro",
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      {/* Suspense required because LoginForm uses useSearchParams */}
      <Suspense fallback={<div className="auth-card">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
