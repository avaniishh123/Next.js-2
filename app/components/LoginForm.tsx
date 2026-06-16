"use client";

import { loginAction } from "@/app/auth-actions";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);
    const result = await loginAction(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-subtitle">Log in to your TaskFlow Pro account</p>

      {registered && (
        <p className="auth-success">
          Account created! You can now log in.
        </p>
      )}

      {error && <p className="auth-error">{error}</p>}

      <form action={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Your password"
            className="form-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-btn"
        >
          {loading ? "Logging in…" : "Log In"}
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}