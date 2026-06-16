"use client";

import { logoutAction } from "@/app/auth-actions";

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="logout-btn">
        Log out
      </button>
    </form>
  );
}