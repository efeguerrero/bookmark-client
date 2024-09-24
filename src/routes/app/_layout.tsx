import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Header from "@/components/app/header/";
import {
  bookmarkGroupsQueryOptions,
  bookmarkQueryOptions,
} from "@/lib/queries/queryOptions";
import * as Icons from "@/components/ui/icons";

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
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(bookmarkGroupsQueryOptions);
    await queryClient.ensureQueryData(bookmarkQueryOptions);
  },
  component: App,
  pendingComponent: () => {
    return (
      <div className="grid h-dvh w-full place-items-center">
        <Icons.spinner className="size-24 animate-spin text-primary" />
      </div>
    );
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
