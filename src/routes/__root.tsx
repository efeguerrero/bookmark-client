import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

//Global Styles + Tailwind
import "@/styles/index.css";

interface RouterContext {
  // The ReturnType of your useAuth hook or the value of your AuthContext
  isSignedIn: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
