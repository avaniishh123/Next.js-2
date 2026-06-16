import { auth } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function NavBar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <header className="navbar">
      <span className="navbar-brand">TaskFlow Pro</span>
      <div className="navbar-right">
        <span className="navbar-user">
          {session.user.name ?? session.user.email}
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}
