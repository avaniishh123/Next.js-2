import SignupForm from "@/app/components/SignupForm";

export const metadata = {
  title: "Sign Up – TaskFlow Pro",
};

export default function SignupPage() {
  return (
    <main className="auth-page">
      <SignupForm />
    </main>
  );
}
