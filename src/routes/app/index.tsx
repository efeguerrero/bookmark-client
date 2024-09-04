import { createFileRoute, redirect } from "@tanstack/react-router";

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
  const user = Route.useRouteContext().user;
  return (
    <div>
      <h1>Hello {user?.primaryEmailAddress?.emailAddress}</h1>
    </div>
  );
}
