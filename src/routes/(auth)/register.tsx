import { createFileRoute } from "@tanstack/react-router";
import { ClerkRegister } from "@/components/auth/clerk-register";

export const Route = createFileRoute("/(auth)/register")({
  component: ClerkRegister,
});
