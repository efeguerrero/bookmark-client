import { SignUp } from "@clerk/clerk-react";

export function ClerkRegister() {
  return <SignUp signInUrl="/login" />;
}
