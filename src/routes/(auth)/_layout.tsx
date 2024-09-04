import { createFileRoute, Outlet,redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: Layout,
});

function Layout() {
  return (
    <div className="grid h-dvh place-items-center">
      <Outlet />
    </div>
  );
}
