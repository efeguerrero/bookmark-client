import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useUser } from "@clerk/clerk-react";
import type { QueryClient } from "@tanstack/react-query";

//Global Styles + Tailwind
import "@/styles/index.css";

interface RouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  user: ReturnType<typeof useUser>["user"];
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
