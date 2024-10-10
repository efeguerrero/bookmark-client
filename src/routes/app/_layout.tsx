import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Header from "@/components/app/header/";
import {
  bookmarkGroupQueries,
  bookmarkQueries,
} from "@/lib/queries/queryOptions";
import * as Icons from "@/components/ui/icons";
import ErrorComponent from "@/components/error";

export const Route = createFileRoute("/app/_layout")({
  beforeLoad: async ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login/$",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(bookmarkGroupQueries.all()),
      queryClient.ensureQueryData(bookmarkQueries.all()),
    ]);
  },
  component: App,
  pendingComponent: () => {
    return (
      <div className="grid h-dvh w-full place-items-center">
        <Icons.spinner className="size-24 animate-spin text-primary" />
      </div>
    );
  },
  errorComponent: ErrorComponent,
});

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-[--nav-height]">
        <Outlet />
      </div>
    </div>
  );
}
