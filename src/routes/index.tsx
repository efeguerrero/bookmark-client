import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-tight">Bookmarker</h2>
    </div>
  );
}
