import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout")({
  component: Layout,
});

function Layout() {
  return (
    <div className="grid h-dvh place-items-center">
      <Outlet />
    </div>
  );
}
