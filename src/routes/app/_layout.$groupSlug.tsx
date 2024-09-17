import { createFileRoute, redirect } from "@tanstack/react-router";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";

export const Route = createFileRoute("/app/_layout/$groupSlug")({
  beforeLoad: async ({ params, context: { queryClient } }) => {
    const bookMarkGroups = await queryClient.ensureQueryData(
      bookmarkGroupsQueryOptions,
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
  component: GroupComponent,
});

function GroupComponent() {
  const { groupSlug } = Route.useParams();
  return <div>Group {groupSlug}</div>;
}
