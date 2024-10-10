import { createFileRoute } from "@tanstack/react-router";
import { ClerkRegister } from "@/components/auth/clerk-register";

export const Route = createFileRoute("/(auth)/_layout/register")({
  component: ClerkRegister,
});
