import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_layout/")({
  component: () => <div>Here you will see ALL your bookmarks</div>,
});
