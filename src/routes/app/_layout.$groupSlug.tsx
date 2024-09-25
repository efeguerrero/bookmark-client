import { createFileRoute, redirect } from "@tanstack/react-router";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import AppMain from "@/components/app/main";

export const Route = createFileRoute("/app/_layout/$groupSlug")({
  beforeLoad: async ({ params, context: { queryClient } }) => {
    const bookMarkGroups = await queryClient.ensureQueryData(
      bookmarkGroupQueries.all(),
    );

    const validSlug = bookMarkGroups.find(
      (bookmark) => bookmark.slug === params.groupSlug,
    );
    if (!validSlug) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: AppMain,
});
