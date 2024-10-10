import { createFileRoute, redirect } from "@tanstack/react-router";
import Home from "@/components/home";
import ErrorComponent from "@/components/error";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/app",
      });
    }
  },
  errorComponent: ErrorComponent,
  component: Home,
});
