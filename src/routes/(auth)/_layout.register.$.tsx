import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout/register/$")({
  component: () => <div>Clerk</div>,
});
