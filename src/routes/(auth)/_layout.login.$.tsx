import { createFileRoute } from "@tanstack/react-router";
import { ClerkLogin } from "@/components/auth/clerk-login";

export const Route = createFileRoute("/(auth)/_layout/login/$")({
  component: ClerkLogin,
});
