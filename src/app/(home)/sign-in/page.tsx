import { SignInButton } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900">
      <SignInButton forceRedirectUrl={"/drive"} />
    </div>
  );
}
