import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_layout/$groupSlug")({
  component: GroupComponent,
});

function GroupComponent() {
  const { groupSlug } = Route.useParams();
  return <div>Group {groupSlug}</div>;
}
