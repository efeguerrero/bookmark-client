import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  beforeLoad: async ({ context, location }) => {
    if (!context.isSignedIn) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <div>
      <p>Hello /(app)/app!</p>
    </div>
  ),
});
