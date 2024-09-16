import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Header from "@/components/app/header/";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";

export const Route = createFileRoute("/app/_layout")({
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
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(bookmarkGroupsQueryOptions),
  component: App,
  pendingComponent: () => {
    return <div>loading data...</div>;
  },
  errorComponent: () => {
    return (
      <div>
        Something went wrong! <br /> Please refresh the page.
      </div>
    );
  },
});

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}
