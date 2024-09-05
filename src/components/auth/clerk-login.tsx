import { SignIn } from "@clerk/clerk-react";

export function ClerkLogin() {
  return <SignIn forceRedirectUrl="/app" signUpUrl="/register" />;
}
