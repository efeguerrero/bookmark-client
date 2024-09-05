import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";

export const Route = createFileRoute("/app/")({
  beforeLoad: async ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: App,
});

function App() {
  const { user } = Route.useRouteContext();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during sign out:", error); //
    }
  };

  return (
    <div>
      <h1 className="text-2xl">
        Hello {user?.primaryEmailAddress?.emailAddress}
      </h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
