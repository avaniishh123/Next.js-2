"use client";

import { signUpAction } from "@/app/auth-actions";
import { useState } from "react";
import Link from "next/link";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);
    const result = await signUpAction(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="auth-card">
      <h1 className="auth-title">Create an account</h1>
      <p className="auth-subtitle">Start managing your tasks today</p>

      {error && <p className="auth-error">{error}</p>}

      <form action={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="form-input"
          />
        </div>

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
            placeholder="Min. 6 characters"
            className="form-input"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-btn"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <Link href="/login" className="auth-link">
          Log in
        </Link>
      </p>
    </div>
  );
}
