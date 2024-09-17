import { RouterProvider, createRouter, Link } from "@tanstack/react-router";
import { useUser } from "@clerk/clerk-react";
import { queryClient } from "./queryClient";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
        <Link className="font-bold" to="/">
          Go home
        </Link>
      </div>
    );
  },
  // No stale loader since using react query.
  defaultPreload: "intent",
  // No stale time for routes
  defaultPreloadStaleTime: 0,
  context: {
    // User will initially be undefined
    // We'll be passing down the auth state from within a React component
    user: undefined,
    queryClient,
  },
});

export function Router() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }
  return <RouterProvider router={router} context={{ user }} />;
}
