import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h2 className="text-3xl font-extrabold">
        Hello this is the home component
      </h2>
    </div>
  );
}
