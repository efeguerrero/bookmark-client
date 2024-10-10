import { createFileRoute, redirect } from "@tanstack/react-router";
import Home from "@/components/home";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: Home,
});
