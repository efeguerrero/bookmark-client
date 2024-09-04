import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

//Global Styles + Tailwind
import "@/styles/index.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>Hello! This is the root.</div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
