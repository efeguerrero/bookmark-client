import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "@/components/app/header";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";

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
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(bookmarkGroupsQueryOptions),
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <Header />
    </div>
  );
}
