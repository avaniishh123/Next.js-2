import SignupForm from "@/app/components/SignupForm";

export const metadata = {
    title: "Sign Up - TaskFlow Pro",
};

export default function LoginPage() {
    return (
        <main className="auth-page">
              <SignupForm/>
        </main>
    );
}